import { Controller, Get, Req, Logger } from '@nestjs/common';
import ResponseData from 'src/common/interfaces/response-data';
import { KycService } from 'src/common/interfaces/kyc-service';
import { CustomerService } from '../services/customers.service';
import RequestData from 'src/common/interfaces/request-data';
import { KycUserRole } from 'src/common/enums/kyc-user-role';
import { PreAuthorize } from 'src/common/auth/auth.decorator';
import AuthRequest from 'src/common/auth/auth-request';

@Controller()
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @PreAuthorize(KycUserRole.CUSTOMER)
  @Get('/contracted-services')
  getCustomerContractedServices(
    @Req() req: AuthRequest,
  ): Promise<ResponseData<KycService[]>> {
    const requestData: RequestData<null> = {
      auth: req.auth,
      headers: req.headers,
    };

    this.logger.log('Received request to get the customer contracted services');
    return this.customerService.getCustomerContractedServices(requestData);
  }
}
