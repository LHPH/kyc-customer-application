import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';
import { ResponseData } from "src/common/interfaces/response-data";
import RequestData from "src/common/interfaces/request-data.interface";
import { AddCustomerContractServiceReq } from "./interfaces/add-customer-contract-services.interface";
import { AdjustCustomerContractServiceReq } from "./interfaces/update-customer-contract-service.interfaces";
import { StatusCustomerContractServiceReq } from "./interfaces/status-customer-contract-service.interfaces";
import KycChannelEntity from "src/common/entities/kyc-channel.entity";
import KycOfficeEntity from "src/common/entities/kyc-office.entity";
import KycExecutiveEntity from "src/common/entities/kyc-executive.entity";
import KycServicesEntity from "src/common/entities/kyc-services.entity";

@Injectable()
export class ExecutiveService{

    constructor(@InjectRepository(KycCustomerServiceEntity)
                private kycCustomerServiceRepository: Repository<KycCustomerServiceEntity>,
                @InjectRepository(KycChannelEntity)
                private kycChannelRepository: Repository<KycChannelEntity>,
                @InjectRepository(KycServicesEntity)
                private kycServicesRepository: Repository<KycServicesEntity>,
                @InjectRepository(KycOfficeEntity)
                private kycOfficeRepository: Repository<KycOfficeEntity>,
                @InjectRepository(KycExecutiveEntity)
                private kycExecutivesRepository: Repository<KycExecutiveEntity>){}


    
    contractServiceForCustomer(requestData: RequestData<AddCustomerContractServiceReq>): Promise<ResponseData<boolean>>{



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

    private getChannel(idChannel: number) : Promise<KycChannelEntity> {

        return this.kycChannelRepository.findBy({id: idChannel})
        .then(results => {

            if(results.length>0){
                return results[0];
            }
            else{
                throw new HttpException({
                    response: {
                        
                    }
                },
                HttpStatus.UNPROCESSABLE_ENTITY)
            }
        })
    }
}