import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycService } from 'src/common/interfaces/kyc-service';
import { ResponseData } from 'src/common/interfaces/response-data';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';

@Injectable()
export class CustomerService{

    constructor(@InjectRepository(KycCustomerServiceEntity)
               private customerServices: Repository<KycCustomerServiceEntity>
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
                    cost: 5000,
                    idChannel: element.channel.id,
                    channel: element.channel.description,
                    idOffice: element.office.id,
                    office: element.office.name,
                    active: element.active,
                    idExecutive: element.executive.id,
                    executive: element.executive.firstName,
                    creationDate: '2025-10-10'
                }
                arr.push(service);
            })

            return arr;
        })
        .then(arr => {
            const response: ResponseData<KycService[]> = {
                data: arr,
                notifications: []
            }
            return response;
        });
    }
}