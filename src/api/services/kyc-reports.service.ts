import { Injectable, Logger } from "@nestjs/common";
import RequestData from "src/common/interfaces/request-data";
import { DiscoveryService } from "src/eureka/discovery/discovery.service";
import { ApplicationFormRequest } from "../document/interfaces/application-form";
import { ContractRequest } from "../document/interfaces/contract";
import { ReportResponse } from "../document/interfaces/kyc-reports-response";
import ResponseData from "src/common/interfaces/response-data";


@Injectable()
export class KycReportService{

    private readonly logger = new Logger(KycReportService.name);

    constructor(discoveryService: DiscoveryService){}

    async createApplicationFormDocument(request: RequestData<ApplicationFormRequest>): Promise<ResponseData<ReportResponse>>{

        this.logger.log('Create Document '+JSON.stringify(request.data));

        return Promise.resolve( {
            data: {
                id: '1-IDGF',
                name: '',
                mimeType: 'm',
                size: 0,
                date: ''
            },
        });
    }

    async createContractDocument(request: RequestData<ContractRequest>): Promise<ResponseData<ReportResponse>>{

        this.logger.log('Create contract '+JSON.stringify(request.data));

        return Promise.resolve( {
            data: {
                id: '1-IDGF',
                name: '',
                mimeType: 'm',
                size: 0,
                date: ''
            },
        });
    }

}