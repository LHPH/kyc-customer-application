import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ResponseData } from 'src/common/interfaces/response-data';
import { KycService } from 'src/common/interfaces/kyc-service';
import { CustomerService } from './services/customers.service';
import RequestData  from 'src/common/interfaces/request-data.interface';
import { KycUserRole } from 'src/common/enums/kyc-user-role.enum';

@Controller()
export class CustomerController {

    constructor(private readonly customerService: CustomerService){}

    @Get('/contracted-services')
    getCustomerContractedServices(@Req() req: Request): Promise<ResponseData<KycService[]>> {

        const requestData: RequestData<null> = {
                        auth: {
                            owner: 5,
                            user: 1,
                            role: KycUserRole.CUSTOMER,
                            channel: 1
                        }
                    }
        
        return this.customerService.getCustomerContractedServices(requestData);
    }
}