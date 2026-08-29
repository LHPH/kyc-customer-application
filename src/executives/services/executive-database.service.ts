import { HttpStatus, Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KycMessagesService } from 'src/common/services/kyc-message.service';
import Message from 'src/common/interfaces/message';
import { MessageCodes } from 'src/common/enums/message-codes';

import KycCustomerServiceEntity from 'src/common/entities/kyc-customer-service';
import KycChannelEntity from 'src/common/entities/kyc-channel';
import KycOfficeEntity from 'src/common/entities/kyc-office';
import KycExecutiveEntity from 'src/common/entities/kyc-executive';
import KycServicesEntity from 'src/common/entities/kyc-services';
import KycCustomerEntity from 'src/common/entities/kyc-customer';
import KycCustomerApplicationEntity from 'src/common/entities/kyc-customer-application';
import RequestData from 'src/common/interfaces/request-data';
import { AddCustomerContractServiceReq } from '../interfaces/add-customer-contract-services';
import JwtData from 'src/common/interfaces/jwt-data';
import { KycRestException } from 'src/common/exception/kyc-rest-exception.exception';
import { AdjustCustomerContractServiceReq } from '../interfaces/update-customer-contract-service';
import { StatusCustomerContractServiceReq } from '../interfaces/status-customer-contract-service';
import KycOfferEntity from 'src/common/entities/kyc-offer';
import { KycOfferStatus } from 'src/common/enums/kyc-offer-status';

@Injectable()
export default class ExecutiveDatabaseService {
  private readonly logger = new Logger(ExecutiveDatabaseService.name);

  constructor(
    @InjectRepository(KycCustomerApplicationEntity)
    private kycCustomerApplicationRepository: Repository<KycCustomerApplicationEntity>,
    @InjectRepository(KycCustomerServiceEntity)
    private kycCustomerServiceRepository: Repository<KycCustomerServiceEntity>,
    @InjectRepository(KycChannelEntity)
    private kycChannelRepository: Repository<KycChannelEntity>,
    @InjectRepository(KycServicesEntity)
    private kycServicesRepository: Repository<KycServicesEntity>,
    @InjectRepository(KycOfficeEntity)
    private kycOfficeRepository: Repository<KycOfficeEntity>,
    @InjectRepository(KycCustomerEntity)
    private kycCustomerRepository: Repository<KycCustomerEntity>,
    @InjectRepository(KycExecutiveEntity)
    private kycExecutivesRepository: Repository<KycExecutiveEntity>,
    @InjectRepository(KycOfferEntity)
    private kycOfferRepository: Repository<KycOfferEntity>,
    private kycMessagesService: KycMessagesService,
  ) {}

  async registerServices(
    requestData: RequestData<AddCustomerContractServiceReq>,
  ): Promise<number> {
    const req: AddCustomerContractServiceReq = requestData.data!;
    const auth: JwtData = requestData.auth!;
    const channel = auth.channel;
    const idOffice = req.idOffice;

    const servicesEntities = [];
    this.logger.log('Starting process to register contract services');

    for (const service of req.contractedServices) {
      const serviceEntity: KycServicesEntity = await this.getKycService(
        service.id,
      );
      servicesEntities.push(serviceEntity);
      await this.checkIfServiceIsNotContracted(req.customerId, service.id);
    }

    const promiseOffice: Promise<KycOfficeEntity> = this.getKycOffice(idOffice);
    const promiseChannel: Promise<KycChannelEntity> =
      this.getKycChannel(channel);
    const promiseExecutive: Promise<KycExecutiveEntity> = this.getKycExecutive(
      auth.owner,
    );
    const promiseCustomer: Promise<KycCustomerEntity> = this.getKycCustomer(
      req.customerId,
    );
    let promiseOffer: Promise<KycOfferEntity | null>;

    if (req.idOffer) {
      promiseOffer = this.getKycOffer(req.idOffer);
    } else {
      promiseOffer = Promise.resolve(null);
    }

    const [
      channelEntity,
      officeEntity,
      executiveEntity,
      customerEntity,
      offerEntity,
    ] = await Promise.all([
      promiseChannel,
      promiseOffice,
      promiseExecutive,
      promiseCustomer,
      promiseOffer,
    ]);

    const promotionalCode = req.promotionalCode ?? null;

    this.logger.log('Mapping data to save in database');
    const application: KycCustomerApplicationEntity = {
      promotionalCode,
      channel: channelEntity,
      office: officeEntity,
      customer: customerEntity,
      executive: executiveEntity,
      offer: offerEntity,
      promotions: req.promotions,
      services: [],
      creationDate: new Date(),
    };

    servicesEntities.map((service) => {
      let discount = 0;
      if (offerEntity) {
        discount = offerEntity.discount ?? 0;
      }

      const contractedService: KycCustomerServiceEntity = {
        service,
        folio: application,
        serviceCost: service.cost - (service.cost * discount) / 100,
        active: true,
        creationDate: new Date(),
      };

      application.services.push(contractedService);
    });

    this.logger.log(`Saving services for customer ${application.customer.id}`);
    return this.kycCustomerApplicationRepository
      .save(application)
      .then((result) => {
        const folio = result.id!;
        this.logger.log(
          `The folio for customer ${application.customer.id} was ${folio}`,
        );
        return folio;
      });
  }

  async updateCostCustomerService(
    requestData: RequestData<AdjustCustomerContractServiceReq>,
  ): Promise<boolean> {
    this.logger.log('Starting process to update cost of the service');
    const req: AdjustCustomerContractServiceReq = requestData.data!;
    const seqService: number = requestData.params?.id;

    this.logger.log(
      `Checking if the customer ${req.customerId} has the service with id ${seqService}`,
    );
    const customerService: KycCustomerServiceEntity =
      await this.getKycCustomerServiceByIdCustomerAndSeqService(
        req.customerId,
        seqService,
        true,
      );

    customerService.serviceCost = req.cost;

    this.logger.log(
      `Updating the service with id ${seqService} for customer ${req.customerId}`,
    );

    return this.kycCustomerServiceRepository
      .update({ id: customerService.id }, { serviceCost: req.cost })
      .then((result) => !!result.affected);
  }

  async updateStatusCustomerService(
    requestData: RequestData<StatusCustomerContractServiceReq>,
  ) {
    this.logger.log('Starting process to enable/disable the service');
    const req: StatusCustomerContractServiceReq = requestData.data!;
    const seqService: number = requestData.params?.id;

    this.logger.log(
      `Checking if the customer ${req.customerId} has the service with id ${seqService}`,
    );
    const customerService: KycCustomerServiceEntity =
      await this.getKycCustomerServiceByIdCustomerAndSeqService(
        req.customerId,
        seqService,
        !req.active,
      );

    customerService.active = req.active;

    this.logger.log(
      `Updating the service with id ${seqService} status for customer ${req.customerId}`,
    );

    return this.kycCustomerServiceRepository
      .update({ id: customerService.id }, { active: req.active })
      .then((result) => !!result.affected);
  }

  private async getKycChannel(idChannel: number): Promise<KycChannelEntity> {
    return this.kycChannelRepository
      .findBy({ id: idChannel })
      .then((results) => {
        if (results.length) {
          return results[0];
        } else {
          throw this.getKycRestException(
            MessageCodes.INVALID_REQUEST,
            `The channel ${idChannel} is invalid.`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });
  }

  private async getKycService(idService: number): Promise<KycServicesEntity> {
    return this.kycServicesRepository
      .findBy({ id: idService })
      .then((results) => {
        if (results.length) {
          return results[0];
        } else {
          throw this.getKycRestException(
            MessageCodes.INVALID_REQUEST,
            `The id for service ${idService} is invalid.`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });
  }

  private async getKycOffice(idOffice: number): Promise<KycOfficeEntity> {
    return this.kycOfficeRepository.findBy({ id: idOffice }).then((results) => {
      if (results.length) {
        return results[0];
      } else {
        throw this.getKycRestException(
          MessageCodes.INVALID_REQUEST,
          `The office ${idOffice} is invalid.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
  }

  private async getKycExecutive(
    idExecutive: number,
  ): Promise<KycExecutiveEntity> {
    return this.kycExecutivesRepository
      .findBy({ id: idExecutive })
      .then((results) => {
        if (results.length) {
          return results[0];
        } else {
          throw this.getKycRestException(
            MessageCodes.INVALID_REQUEST,
            `The executive ${idExecutive} is invalid.`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });
  }

  private async getKycCustomer(idCustomer: number): Promise<KycCustomerEntity> {
    return this.kycCustomerRepository
      .findBy({ id: idCustomer })
      .then((results) => {
        if (results.length) {
          return results[0];
        } else {
          throw this.getKycRestException(
            MessageCodes.INVALID_REQUEST,
            '',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
  }

  private async getKycOffer(idOffer: number): Promise<KycOfferEntity> {
    return this.kycOfferRepository
      .findBy({
        id: idOffer,
        status: KycOfferStatus.PUBLISHED,
      })
      .then((results) => {
        if (results.length) {
          return results[0];
        } else {
          throw this.getKycRestException(
            MessageCodes.INVALID_REQUEST,
            'The offer is not valid',
            HttpStatus.BAD_REQUEST,
          );
        }
      });
  }

  async getKycCustomerServiceByIdCustomerAndSeqService(
    idCustomer: number,
    sequenceService: number,
    active: boolean = true,
  ): Promise<KycCustomerServiceEntity> {
    return this.kycCustomerServiceRepository
      .find({
        where: {
          id: sequenceService,
          folio: {
            customer: {
              id: idCustomer,
            },
          },
          active,
        },
      })
      .then((results) => {
        if (results.length) {
          return results[0];
        }
        throw this.getKycRestException(
          MessageCodes.SERVICE_NOT_ACQUIRED_OR_INACTIVE,
          '',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }

  private async checkIfServiceIsNotContracted(
    idCustomer: number,
    idService: number,
  ) {
    return this.kycCustomerApplicationRepository
      .find({
        relations: {
          services: true,
        },
        where: {
          customer: {
            id: idCustomer,
          },
          services: {
            service: {
              id: idService,
            },
            active: true,
          },
        },
      })
      .then((results) => {
        if (results.length) {
          throw this.getKycRestException(
            MessageCodes.SERVICE_ALREADY_ACQUIRED,
            null,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        return;
      });
  }

  private getKycRestException(
    code: string,
    complement: string | null = '',
    status: HttpStatus,
  ): KycRestException {
    const notification: Message = this.kycMessagesService.getMessage(code);
    notification.message = `${notification.message}. ${complement}`.trim();
    return new KycRestException({
      message: notification,
      status,
    });
  }
}
