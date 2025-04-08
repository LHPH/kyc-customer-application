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

        const service: KycService = {
            id: 1,
            idService: 1,
            service: 'SERVICE 1',
            cost: 5000,
            idChannel: 1,
            channel: 'ONLINE',
            idOffice: 1,
            office: 'OFFICE 1',
            active: true,
            idExecutive: 1,
            executive: 'EXECUTIVE',
            creationDate: '2025-10-10'
        }

        const arr: KycService[] = [service];

        const response: ResponseData<KycService[]> = {
            data: arr,
            notifications: []
        }

        return Promise.resolve(response);
    }
}