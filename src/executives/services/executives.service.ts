import { HttpStatus, Injectable } from "@nestjs/common";
import { ResponseData } from "src/common/interfaces/response-data";
import RequestData from "src/common/interfaces/request-data.interface";
import { AddCustomerContractServiceReq, AddCustomerContractServiceResp } from "../interfaces/add-customer-contract-services.interface";
import { AdjustCustomerContractServiceReq } from "../interfaces/update-customer-contract-service.interfaces";
import { StatusCustomerContractServiceReq } from "../interfaces/status-customer-contract-service.interfaces";
import { KycRestException } from "src/common/exception/kyc-rest-exception.exception";
import { KycMessagesService } from "src/common/services/kyc-message.service";
import { Message } from "src/common/interfaces/message";
import { MessageCodes } from "src/common/enums/message-codes.enum";
import ExecutiveDatabaseService from "./executive-database.service";
import ExecutiveDocumentService from "./executive-document.service";

@Injectable()
export class ExecutiveService{

    constructor(private executiveDatabaseSerivce: ExecutiveDatabaseService,
                private executiveDocumentService: ExecutiveDocumentService,
                private kycMessagesService: KycMessagesService){}


    async contractServiceForCustomer(requestData: RequestData<AddCustomerContractServiceReq>): Promise<ResponseData<AddCustomerContractServiceResp>>{

        return Promise.resolve({
            data: {
                folio: await this.executiveDatabaseSerivce.registerServices(requestData)
            }
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