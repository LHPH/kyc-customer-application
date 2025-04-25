import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycService } from 'src/common/interfaces/kyc-service';
import { ResponseData } from 'src/common/interfaces/response-data';
import  RequestData from 'src/common/interfaces/request-data.interface';
import  KycCustomerApplicationEntity  from 'src/common/entities/kyc-customer-application.entity';
import { KycMessagesService } from 'src/common/services/kyc-message.service';

@Injectable()
export class CustomerService{

    constructor(@InjectRepository(KycCustomerApplicationEntity)
               private kycCustomerApplicationRepository: Repository<KycCustomerApplicationEntity>,
               private kycMessagesService: KycMessagesService
               ){}

    getCustomerContractedServices(requestData: RequestData<null> ): Promise<ResponseData<KycService[]>> {

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

            results.map(application => {

                let serviceView: KycService;

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
                        executive: application.executive.firstName,
                        creationDate: recordService.creationDate!,
                        modificationDate: recordService.modificationDate
                    }
                    arr[arr.length] = serviceView;
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