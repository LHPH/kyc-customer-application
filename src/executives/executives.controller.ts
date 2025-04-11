import { Controller, Post, Put, Param, Body, Req } from "@nestjs/common";
import { Request } from 'express';
import { ExecutiveService } from "./executives.service";
import { AddCustomerContractServiceReq } from "src/executives/interfaces/add-customer-contract-services.interface";
import { AdjustCustomerContractServiceReq } from "src/executives/interfaces/update-customer-contract-service.interfaces";
import { StatusCustomerContractServiceReq } from "src/executives/interfaces/status-customer-contract-service.interfaces";
import { ResponseData } from "src/common/interfaces/response-data";

@Controller()
export class ExecutiveController{

    constructor(private executiveService: ExecutiveService){}

    @Post('/service-contract/fulfillment')
    contractServiceForCustomer(
        @Req() req: Request,
        @Body() bodyReq: AddCustomerContractServiceReq): Promise<ResponseData<boolean>> {

            return this.executiveService.contractServiceForCustomer();
    }

    @Put('/service-contract/{:id}/adjustment')
    adjustContractServiceForCustomer(
        @Req() req: Request,
        @Param('id') id: number,
        @Body() bodyReq: AdjustCustomerContractServiceReq): Promise<ResponseData<boolean>> {

            return this.executiveService.adjustContractServiceForCustomer();
    }

    @Post('/service-contract/{:id}/cancelation')
    cancelationContractServiceForCustomer(
        @Req() req: Request,
        @Param('id') id: number,
        @Body() bodyReq: StatusCustomerContractServiceReq): Promise<ResponseData<boolean>>{

            return this.executiveService.cancelationContractServiceForCustomer();
    }
}