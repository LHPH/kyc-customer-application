import { Injectable } from "@nestjs/common";

import { KycMessagesService } from "src/common/services/kyc-message.service";
import Message  from "src/common/interfaces/message";
import { GetDocumentRequest, GetDocumentResponse } from "../interfaces/get-documents";
import RequestData from "src/common/interfaces/request-data";

@Injectable()
export default class ExecutiveDocumentService{

    constructor(private kycMessagesService: KycMessagesService){}

    generateDocumentForContractingServices(requestData: RequestData<GetDocumentRequest>): Promise<GetDocumentResponse>{
        
        return Promise.resolve({
            documents: []
        })
    }
}