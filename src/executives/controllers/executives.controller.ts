import { Controller, Post, Param, Body, Req, Logger } from '@nestjs/common';
import { ExecutiveService } from '../services/executives.service';
import {
  AddCustomerContractServiceReq,
  AddCustomerContractServiceResp,
} from 'src/executives/interfaces/add-customer-contract-services';
import { AdjustCustomerContractServiceReq } from 'src/executives/interfaces/update-customer-contract-service';
import { StatusCustomerContractServiceReq } from 'src/executives/interfaces/status-customer-contract-service';
import ResponseData from 'src/common/interfaces/response-data';
import RequestData from 'src/common/interfaces/request-data';
import { KycUserRole } from 'src/common/enums/kyc-user-role';
import {
  GetDocumentRequest,
  GetDocumentResponse,
} from '../interfaces/get-documents';
import { PreAuthorize } from 'src/common/auth/auth.decorator';
import AuthRequest from 'src/common/auth/auth-request';

@Controller()
export class ExecutiveController {
  private readonly logger = new Logger(ExecutiveController.name);

  constructor(private executiveService: ExecutiveService) {}

  @PreAuthorize(KycUserRole.EXECUTIVE)
  @Post('/service-contract/fulfillment')
  contractServiceForCustomer(
    @Req() req: AuthRequest,
    @Body() bodyReq: AddCustomerContractServiceReq,
  ): Promise<ResponseData<AddCustomerContractServiceResp>> {
    const requestData: RequestData<AddCustomerContractServiceReq> = {
      auth: req.auth,
      headers: req.headers,
      data: bodyReq,
    };

    this.logger.log(
      'Received request to register contract services for customer',
    );
    return this.executiveService.contractServiceForCustomer(requestData);
  }

  @PreAuthorize(KycUserRole.EXECUTIVE)
  @Post('/service-contract/documents')
  generateDocuments(
    @Req() req: AuthRequest,
    @Body() bodyReq: GetDocumentRequest,
  ): Promise<ResponseData<GetDocumentResponse>> {
    const requestData: RequestData<GetDocumentRequest> = {
      auth: req.auth,
      headers: req.headers,
      data: bodyReq,
    };

    return this.executiveService.generateDocumentsForCustomer(requestData);
  }

  @PreAuthorize(KycUserRole.EXECUTIVE)
  @Post('/service-contract/{:id}/adjustment')
  adjustContractServiceForCustomer(
    @Req() req: AuthRequest,
    @Param('id') id: number,
    @Body() bodyReq: AdjustCustomerContractServiceReq,
  ): Promise<ResponseData<boolean>> {
    const requestData: RequestData<AdjustCustomerContractServiceReq> = {
      params: {
        id,
      },
      headers: req.headers,
      auth: req.auth,
      data: bodyReq,
    };

    this.logger.log('Received request to adjust contract service');
    return this.executiveService.adjustContractServiceForCustomer(requestData);
  }

  @PreAuthorize(KycUserRole.EXECUTIVE)
  @Post('/service-contract/{:id}/status')
  statusContractServiceForCustomer(
    @Req() req: AuthRequest,
    @Param('id') id: number,
    @Body() bodyReq: StatusCustomerContractServiceReq,
  ): Promise<ResponseData<boolean>> {
    const requestData: RequestData<StatusCustomerContractServiceReq> = {
      params: {
        id,
      },
      headers: req.headers,
      auth: req.auth,
      data: bodyReq,
    };

    this.logger.log('Received request to enable/disable contract service');
    return this.executiveService.statusContractServiceForCustomer(requestData);
  }
}
