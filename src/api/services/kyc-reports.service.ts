import { Injectable, Logger } from "@nestjs/common";
import RequestData from "src/common/interfaces/request-data";
import { DiscoveryService } from "src/eureka/discovery/discovery.service";
import { ApplicationFormRequest } from "../document/interfaces/application-form";
import { ContractRequest } from "../document/interfaces/contract";


@Injectable()
export class KycReportService{

    private readonly logger = new Logger(KycReportService.name);

    constructor(discoveryService: DiscoveryService){}

    async createApplicationFormDocument(request: RequestData<ApplicationFormRequest>){

        this.logger.log('Create Document '+JSON.stringify(request.data));
    }

    async createContractDocument(request: RequestData<ContractRequest>){

        this.logger.log('Create contract '+JSON.stringify(request.data));
    }

}