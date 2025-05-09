import { Controller, Get, Req, Logger } from '@nestjs/common';
import { Request } from 'express';
import ResponseData from 'src/common/interfaces/response-data';
import { KycService } from 'src/common/interfaces/kyc-service';
import { CustomerService } from '../services/customers.service';
import RequestData  from 'src/common/interfaces/request-data';
import { KycUserRole } from 'src/common/enums/kyc-user-role';

@Controller()
export class CustomerController {

    private readonly logger = new Logger(CustomerController.name);

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

        this.logger.log('Received request to get the customer contracted services');
        return this.customerService.getCustomerContractedServices(requestData);
    }
}