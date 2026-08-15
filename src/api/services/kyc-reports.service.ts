import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import RequestData from 'src/common/interfaces/request-data';
import { ApplicationFormRequest } from '../interfaces/document/application-form';
import { ContractRequest } from '../interfaces/document/contract';
import { ReportResponse } from '../interfaces/document/kyc-reports-response';
import ResponseData from 'src/common/interfaces/response-data';
import { KycMessagesService } from 'src/common/services/kyc-message.service';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import Message from 'src/common/interfaces/message';
import { KycRestException } from 'src/common/exception/kyc-rest-exception.exception';
import { MessageCodes } from 'src/common/enums/message-codes';
import { ConfigService } from '@nestjs/config';
import ServicesCatalog from 'src/common/interfaces/services-catalog';

@Injectable()
export class KycReportService {
  private readonly logger = new Logger(KycReportService.name);

  private readonly SERVICE_NAME = 'kyc-reports';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private kycMessagesService: KycMessagesService,
  ) {}

  async createApplicationFormDocument(
    request: RequestData<ApplicationFormRequest>,
  ): Promise<ResponseData<ReportResponse>> {
    this.logger.debug('Create Document ' + JSON.stringify(request.data));

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.headers?.authorization}`,
    };

    const serviceCatalog: ServicesCatalog =
      this.configService.get<ServicesCatalog>('services')!;

    this.logger.log('Call service to generate the application form');
    const { data } = await firstValueFrom(
      this.httpService
        .post<
          ResponseData<ReportResponse>
        >(`${serviceCatalog[this.SERVICE_NAME]}/reports/application-form`, request.data, { headers })
        .pipe(
          catchError((error: AxiosError) => {
            const notification: Message = this.kycMessagesService.getMessage(
              MessageCodes.APPLICATION_FORM_NOT_GENERATED,
            );
            throw new KycRestException({
              message: notification,
              status: HttpStatus.BAD_GATEWAY,
              error,
            });
          }),
        ),
    );

    return data;
  }

  async createContractDocument(
    request: RequestData<ContractRequest>,
  ): Promise<ResponseData<ReportResponse>> {
    this.logger.debug('Create contract ' + JSON.stringify(request.data));

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${request.headers?.authorization}`,
    };

    const serviceCatalog: ServicesCatalog =
      this.configService.get<ServicesCatalog>('services')!;

    this.logger.log('Call service to generate the contract');
    const { data } = await firstValueFrom(
      this.httpService
        .post<
          ResponseData<ReportResponse>
        >(`${serviceCatalog[this.SERVICE_NAME]}/reports/contract`, request.data, { headers })
        .pipe(
          catchError((error: AxiosError) => {
            const notification: Message = this.kycMessagesService.getMessage(
              MessageCodes.CONTRACT_DOCUMENT_NOT_GENERATED,
            );
            throw new KycRestException({
              message: notification,
              status: HttpStatus.BAD_GATEWAY,
              error: error.response?.data,
            });
          }),
        ),
    );

    return data;
  }
}
