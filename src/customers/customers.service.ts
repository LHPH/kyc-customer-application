import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycService } from 'src/common/interfaces/kyc-service';
import { ResponseData } from 'src/common/interfaces/response-data';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';
import { Notification } from 'src/common/interfaces/notification';
import { KycMessagesService } from 'src/common/services/kyc-message.service';
import { MessageCodes } from 'src/common/enums/message-codes.enum';

@Injectable()
export class CustomerService{

    constructor(@InjectRepository(KycCustomerServiceEntity)
               private customerServices: Repository<KycCustomerServiceEntity>,
               private kycMessagesService: KycMessagesService
               ){}

    getCustomerContractedServices(): Promise<ResponseData<KycService[]>> {

        return this.customerServices.find({where: {idCustomer: 5}})
        .then(results => {

            const arr: KycService[] = [];
            let service: KycService;

            results.map(element => {
                
                service = {
                    id: element.id,
                    idService: element.service.id,
                    service: element.service.description,
                    cost: element.serviceCost,
                    idChannel: element.channel.id,
                    channel: element.channel.description,
                    idOffice: element.office.id,
                    office: element.office.name,
                    active: element.active,
                    idExecutive: element.executive.id,
                    executive: element.executive.firstName,
                    creationDate: element.creationDate,
                    modificationDate: element.modificationDate
                }
                arr[arr.length] = service;
            })

            return arr;
        })
        .then(arr => {
            const successfulResponse: ResponseData<KycService[]> = {
                data: arr
            }
            return successfulResponse;
        })
       /* .catch(error => {

            console.error('ERROR ',error);
            const notification: Notification = this.kycMessagesService.getMessage(MessageCodes.UNEXPECTED_ERROR);

            const errorResponse: ResponseData<KycService[]> = {
                data: null,
                notifications: [notification]
            }
            return errorResponse;
        })*/
    }
}