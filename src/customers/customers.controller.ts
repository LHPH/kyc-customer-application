import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/common/interfaces/response-data';
import { KycService } from 'src/common/interfaces/kyc-service';
import { CustomerService } from './customers.service';

@Controller()
export class CustomerController {

    constructor(private readonly customerService: CustomerService){}

    @Get('/contracted-services')
    getCustomerContractedServices(): Promise<ResponseData<KycService[]>> {

        return this.customerService.getCustomerContractedServices();
    }
}