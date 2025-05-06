import { Injectable } from "@nestjs/common";

import { KycMessagesService } from "src/common/services/kyc-message.service";
import Message  from "src/common/interfaces/message";

@Injectable()
export default class ExecutiveDocumentService{

    constructor(private kycMessagesService: KycMessagesService){}

    generateDocumentForContractingServices(){
        
    }
}