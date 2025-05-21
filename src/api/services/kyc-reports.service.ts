import { Injectable, Logger } from "@nestjs/common";
import { DiscoveryService } from "src/eureka/discovery/discovery.service";


@Injectable()
export class KycReportService{

    private readonly logger = new Logger(KycReportService.name);

    constructor(discoveryService: DiscoveryService){}

    createApplicationFormDocument(){

        this.logger.log('Create Document');
    }

    createContractDocument(){

    }

}