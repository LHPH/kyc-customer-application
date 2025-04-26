import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import  KycCustomerServiceEntity  from 'src/common/entities/kyc-customer-service.entity';
import { ResponseData } from "src/common/interfaces/response-data";
import RequestData from "src/common/interfaces/request-data.interface";
import { AddCustomerContractServiceReq } from "../interfaces/add-customer-contract-services.interface";
import { AdjustCustomerContractServiceReq } from "../interfaces/update-customer-contract-service.interfaces";
import { StatusCustomerContractServiceReq } from "../interfaces/status-customer-contract-service.interfaces";
import KycChannelEntity from "src/common/entities/kyc-channel.entity";
import KycOfficeEntity from "src/common/entities/kyc-office.entity";
import KycExecutiveEntity from "src/common/entities/kyc-executive.entity";
import KycServicesEntity from "src/common/entities/kyc-services.entity";
import JwtData from "src/common/interfaces/jwt-data.interface";
import { KycRestException } from "src/common/exception/kyc-rest-exception.exception";
import { KycMessagesService } from "src/common/services/kyc-message.service";
import { Message } from "src/common/interfaces/message";
import { MessageCodes } from "src/common/enums/message-codes.enum";
import KycCustomerEntity from "src/common/entities/kyc-customer.entity";
import KycCustomerApplicationEntity from "src/common/entities/kyc-customer-application.entity";

@Injectable()
export class ExecutiveService{

    constructor(@InjectRepository(KycCustomerApplicationEntity)
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
                private kycMessagesService: KycMessagesService){}


    
    async contractServiceForCustomer(requestData: RequestData<AddCustomerContractServiceReq>): Promise<ResponseData<boolean>>{

        const req: AddCustomerContractServiceReq = requestData.data!;
        const auth: JwtData = requestData.auth!;
        const channel = auth.channel;
        const idOffice = req.idOffice;

        let servicesEntities = [];

        for(const service of req.contractedServices){

            let serviceEntity: KycServicesEntity = await this.getKycService(service.id);
            servicesEntities.push(serviceEntity);
            await this.checkIfServiceIsNotContracted(req.customerId, service.id);
        }

        const promiseOffice: Promise<KycOfficeEntity> = this.getKycOffice(idOffice);
        const promiseChannel: Promise<KycChannelEntity> = this.getKycChannel(channel);
        const promiseExecutive: Promise<KycExecutiveEntity> = this.getKycExecutive(auth.owner);
        const promiseCustomer: Promise<KycCustomerEntity> = this.getKycCustomer(req.customerId);

        const [channelEntity, officeEntity, executiveEntity, customerEntity] 
            = await Promise.all([promiseChannel,promiseOffice,promiseExecutive, promiseCustomer]);

        const promotionalCode = req.promotionalCode ?? null;
        
        let application: KycCustomerApplicationEntity = {
            promotionalCode, 
            channel: channelEntity,
            office: officeEntity,
            customer: customerEntity,
            executive: executiveEntity,
            services: []
        }    

        servicesEntities.map((service, index) => {

            let discount = 0;
            if(promotionalCode){
                discount = 10;
            }

            let contractedService: KycCustomerServiceEntity = {
                service,
                folio: application,
                serviceCost: service.cost - ((service.cost * discount) / 100),
                active: true
            }

            application.services.push(contractedService);
        });

        console.log(application);
        console.log(application.services);

        return Promise.resolve({
            data: true
        });
    }

    adjustContractServiceForCustomer(requestData: RequestData<AdjustCustomerContractServiceReq>):  Promise<ResponseData<boolean>>{

        return Promise.resolve({
            data: true
        });
    }

    statusContractServiceForCustomer(requestData: RequestData<StatusCustomerContractServiceReq>): Promise<ResponseData<boolean>>{

        return Promise.resolve({
            data: true
        });
    }

    private async getKycChannel(idChannel: number) : Promise<KycChannelEntity> {

        return this.kycChannelRepository.findBy({id: idChannel})
        .then(results => {

            if(results.length){
                return results[0];
            }
            else{
                throw this.getKycRestException(MessageCodes.INVALID_REQUEST, `The channel ${idChannel} is invalid.`,HttpStatus.BAD_REQUEST);
            }
        })
    }

    private async getKycService(idService: number) : Promise<KycServicesEntity> {

        return this.kycServicesRepository.findBy({id: idService})
        .then(results => {

            if(results.length){
                return results[0];
            }
            else{
                throw this.getKycRestException(MessageCodes.INVALID_REQUEST, `The id for service ${idService} is invalid.`,HttpStatus.BAD_REQUEST);
            }
        })
    }

    private async getKycOffice(idOffice: number) : Promise<KycOfficeEntity> {

        return this.kycOfficeRepository.findBy({id: idOffice})
        .then(results => {

            if(results.length){
                return results[0];
            }
            else{
                throw this.getKycRestException(MessageCodes.INVALID_REQUEST, `The office ${idOffice} is invalid.`,HttpStatus.BAD_REQUEST);
            }
        })
    }

    private async getKycExecutive(idExecutive: number) : Promise<KycExecutiveEntity> {

        return this.kycExecutivesRepository.findBy({id: idExecutive})
        .then(results => {

            if(results.length){
                return results[0];
            }
            else{
                throw this.getKycRestException(MessageCodes.INVALID_REQUEST, `The executive ${idExecutive} is invalid.`,HttpStatus.BAD_REQUEST);
            }
        })
    }

    private async getKycCustomer(idCustomer: number) : Promise<KycCustomerEntity> {

        return this.kycCustomerRepository.findBy({id: idCustomer})
        .then(results => {

            if(results.length){
                return results[0];
            }
            else{
                throw this.getKycRestException(MessageCodes.INVALID_REQUEST,'',HttpStatus.BAD_REQUEST);
            }
        })
    }



    private async checkIfServiceIsNotContracted(idCustomer: number, idService: number){

        return this.kycCustomerApplicationRepository.find(
            {
                relations:{
                    services: true
                },
                where: {
                    customer: {
                        id: idCustomer
                    },
                    services:{
                        service:{
                            id: idService
                        },
                        active: true
                    }
                }
            })
        .then(results => {
            if(results.length){
                throw this.getKycRestException(MessageCodes.SERVICE_ALREADY_ACQUIRED,null,HttpStatus.UNPROCESSABLE_ENTITY);
            }
            return;
        });
    }

    private getKycRestException(code: string, complement: string | null = '',status:HttpStatus): KycRestException{

        const notification: Message = this.kycMessagesService.getMessage(code);
        notification.message = `${notification.message}. ${complement}`.trim();
        return new KycRestException(
            {
               message: notification,
               status
            })
    }
}