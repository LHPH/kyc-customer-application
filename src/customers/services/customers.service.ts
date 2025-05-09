import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycService } from 'src/common/interfaces/kyc-service';
import  ResponseData from 'src/common/interfaces/response-data';
import  RequestData from 'src/common/interfaces/request-data';
import  KycCustomerApplicationEntity  from 'src/common/entities/kyc-customer-application';
import { KycMessagesService } from 'src/common/services/kyc-message.service'; 

@Injectable()
export class CustomerService{

    private readonly logger = new Logger(CustomerService.name);

    constructor(@InjectRepository(KycCustomerApplicationEntity)
               private kycCustomerApplicationRepository: Repository<KycCustomerApplicationEntity>,
               private kycMessagesService: KycMessagesService
               ){}

    getCustomerContractedServices(requestData: RequestData<null> ): Promise<ResponseData<KycService[]>> {

        this.logger.log('Retrieve customer contracted services');
        return this.kycCustomerApplicationRepository.find(
        {
            relations:{
                services: true
            },
            where: {
                customer: {
                    id: requestData.auth?.owner
                },
                services:{
                    active: true
                }
            }
        })
        .then(results => {

            const arr: KycService[] = [];

            this.logger.log(`It was retrieved ${results?.length} services`);
            results.map(application => {

                let serviceView: KycService;

                this.logger.log(`Mapping services of folio ${application.id}`);
                application.services.map(recordService => {

                    serviceView = {
                        folio: application.id!,
                        serviceSequential: recordService.id!,
                        serviceType: recordService.service.id,
                        service: recordService.service.name,
                        cost: recordService.serviceCost,
                        idChannel: application.channel.id,
                        channel: application.channel.description,
                        idOffice: application.office.id,
                        office: application.office.name,
                        active: recordService.active,
                        idExecutive: application.executive.id,
                        executive: `${application.executive.firstName} ${application.executive.lastName}`,
                        idOffer: application.offer?.id,
                        campaign: application.offer?.campaign.campaignName,
                        promotions: application.promotions,
                        creationDate: recordService.creationDate!,
                        modificationDate: recordService.modificationDate
                    }
                    arr[arr.length] = serviceView;
                    this.logger.debug(`The service is ${JSON.stringify(serviceView)}`);
                });
            })
            return arr;
        })
        .then(arr => {
            const successfulResponse: ResponseData<KycService[]> = {
                data: arr
            }
            return successfulResponse;
        })
    }
}