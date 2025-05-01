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

        return this.executiveDatabaseSerivce.registerServices(requestData)
            .then(folio => {
                return {
                    data: {
                        folio
                    }
                }
            })
    }

    async adjustContractServiceForCustomer(requestData: RequestData<AdjustCustomerContractServiceReq>):  Promise<ResponseData<boolean>>{

        return this.executiveDatabaseSerivce.updateCostCustomerService(requestData)
            .then(result => {
                return {
                    data: result
                }
            })
    }

    async statusContractServiceForCustomer(requestData: RequestData<StatusCustomerContractServiceReq>): Promise<ResponseData<boolean>>{

        return this.executiveDatabaseSerivce.updateStatusCustomerService(requestData)
            .then(result => {
                return {
                    data: result
                }
            })
    }
}