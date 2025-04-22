import { Controller, Post, Param, Body, Req } from "@nestjs/common";
import { Request } from 'express';
import { ExecutiveService } from "./executives.service";
import { AddCustomerContractServiceReq } from "src/executives/interfaces/add-customer-contract-services.interface";
import { AdjustCustomerContractServiceReq } from "src/executives/interfaces/update-customer-contract-service.interfaces";
import { StatusCustomerContractServiceReq } from "src/executives/interfaces/status-customer-contract-service.interfaces";
import { ResponseData } from "src/common/interfaces/response-data";
import RequestData from "src/common/interfaces/request-data.interface";
import { KycUserRole } from "src/common/enums/kyc-user-role.enum";

@Controller()
export class ExecutiveController{

    constructor(private executiveService: ExecutiveService){}

    @Post('/service-contract/fulfillment')
    contractServiceForCustomer(
        @Req() req: Request,
        @Body() bodyReq: AddCustomerContractServiceReq): Promise<ResponseData<boolean>> {

            const requestData: RequestData<AddCustomerContractServiceReq> = {
                auth: {
                    owner: 1,
                    user: 1,
                    role: KycUserRole.EXECUTIVE,
                    channel: 1
                },
                data: bodyReq
            }

            return this.executiveService.contractServiceForCustomer(requestData);
    }

    @Post('/service-contract/{:id}/adjustment')
    adjustContractServiceForCustomer(
        @Req() req: Request,
        @Param('id') id: number,
        @Body() bodyReq: AdjustCustomerContractServiceReq): Promise<ResponseData<boolean>> {

            const requestData: RequestData<AdjustCustomerContractServiceReq> = {
                params: {
                    'id': id
                },
                auth: {
                    owner: 1,
                    user: 1,
                    role: KycUserRole.EXECUTIVE,
                    channel: 1
                },
                data: bodyReq
            }

            return this.executiveService.adjustContractServiceForCustomer(requestData);
    }

    @Post('/service-contract/{:id}/status')
    statusContractServiceForCustomer(
        @Req() req: Request,
        @Param('id') id: number,
        @Body() bodyReq: StatusCustomerContractServiceReq): Promise<ResponseData<boolean>>{

            const requestData: RequestData<StatusCustomerContractServiceReq> = {
                params: {
                    'id': id
                },
                auth: {
                    owner: 1,
                    user: 1,
                    role: KycUserRole.EXECUTIVE,
                    channel: 1
                },
                data: bodyReq
            }

            return this.executiveService.statusContractServiceForCustomer(requestData);
    }
}