import { Injectable, Logger } from '@nestjs/common';
import ResponseData from 'src/common/interfaces/response-data';
import RequestData from 'src/common/interfaces/request-data';
import {
  AddCustomerContractServiceReq,
  AddCustomerContractServiceResp,
} from '../interfaces/add-customer-contract-services';
import { AdjustCustomerContractServiceReq } from '../interfaces/update-customer-contract-service';
import { StatusCustomerContractServiceReq } from '../interfaces/status-customer-contract-service';
import { KycMessagesService } from 'src/common/services/kyc-message.service';
import ExecutiveDatabaseService from './executive-database.service';
import ExecutiveDocumentService from './executive-document.service';
import {
  GetDocumentRequest,
  GetDocumentResponse,
} from '../interfaces/get-documents';

@Injectable()
export class ExecutiveService {
  private readonly logger = new Logger(ExecutiveService.name);

  constructor(
    private executiveDatabaseSerivce: ExecutiveDatabaseService,
    private executiveDocumentService: ExecutiveDocumentService,
    private kycMessagesService: KycMessagesService,
  ) {}

  async contractServiceForCustomer(
    requestData: RequestData<AddCustomerContractServiceReq>,
  ): Promise<ResponseData<AddCustomerContractServiceResp>> {
    this.logger.log('Saving contracted services');
    return this.executiveDatabaseSerivce
      .registerServices(requestData)
      .then((folio) => {
        return {
          data: {
            folio,
          },
        };
      });
  }

  async adjustContractServiceForCustomer(
    requestData: RequestData<AdjustCustomerContractServiceReq>,
  ): Promise<ResponseData<boolean>> {
    this.logger.log('Adjust cost for contracted service');
    return this.executiveDatabaseSerivce
      .updateCostCustomerService(requestData)
      .then((result) => {
        return {
          data: result,
        };
      });
  }

  async statusContractServiceForCustomer(
    requestData: RequestData<StatusCustomerContractServiceReq>,
  ): Promise<ResponseData<boolean>> {
    this.logger.log('Enabling/Disabling customer service');
    return this.executiveDatabaseSerivce
      .updateStatusCustomerService(requestData)
      .then((result) => {
        return {
          data: result,
        };
      });
  }

  async generateDocumentsForCustomer(
    requestData: RequestData<GetDocumentRequest>,
  ): Promise<ResponseData<GetDocumentResponse>> {
    return this.executiveDocumentService
      .generateDocumentForContractingServices(requestData)
      .then((result) => {
        return {
          data: result,
        };
      });
  }
}
