import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';
import { ResponseData } from "src/common/interfaces/response-data";

@Injectable()
export class ExecutiveService{

    constructor(@InjectRepository(KycCustomerServiceEntity)
                private customerServices: Repository<KycCustomerServiceEntity>){}


    
    contractServiceForCustomer(): Promise<ResponseData<boolean>>{

        return Promise.resolve({
            data: true,
            notifications: []
        });
    }

    adjustContractServiceForCustomer():  Promise<ResponseData<boolean>>{

        return Promise.resolve({
            data: true,
            notifications: []
        });
    }

    cancelationContractServiceForCustomer(): Promise<ResponseData<boolean>>{

        return Promise.resolve({
            data: true,
            notifications: []
        });
    }
}