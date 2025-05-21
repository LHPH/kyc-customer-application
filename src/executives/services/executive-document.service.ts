import { Injectable } from "@nestjs/common";

import { KycMessagesService } from "src/common/services/kyc-message.service";
import Message  from "src/common/interfaces/message";
import { GetDocumentRequest, GetDocumentResponse } from "../interfaces/get-documents";
import RequestData from "src/common/interfaces/request-data";
import { KycReportService } from "src/api/services/kyc-reports.service";

@Injectable()
export default class ExecutiveDocumentService{

    constructor(
        private kycReportService: KycReportService,
        private kycMessagesService: KycMessagesService){}

    generateDocumentForContractingServices(requestData: RequestData<GetDocumentRequest>): Promise<GetDocumentResponse>{

        this.kycReportService.createApplicationFormDocument();
        
        return Promise.resolve({
            documents: []
        })
    }
}