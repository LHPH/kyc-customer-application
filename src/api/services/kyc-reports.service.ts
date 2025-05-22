import { HttpStatus, Injectable, Logger } from "@nestjs/common";
import RequestData from "src/common/interfaces/request-data";
import { DiscoveryService } from "src/eureka/discovery/discovery.service";
import { ApplicationFormRequest } from "../interfaces/document/application-form";
import { ContractRequest } from "../interfaces/document/contract";
import { ReportResponse } from "../interfaces/document/kyc-reports-response";
import ResponseData from "src/common/interfaces/response-data";
import { KycMessagesService } from "src/common/services/kyc-message.service";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import Message from "src/common/interfaces/message";
import { KycRestException } from "src/common/exception/kyc-rest-exception.exception";
import { MessageCodes } from "src/common/enums/message-codes";


@Injectable()
export class KycReportService{

    private readonly logger = new Logger(KycReportService.name);

    constructor(
        discoveryService: DiscoveryService,
        private httpService: HttpService,
        private kycMessagesService: KycMessagesService
    ){}

    async createApplicationFormDocument(request: RequestData<ApplicationFormRequest>): Promise<ResponseData<ReportResponse>>{

        this.logger.log('Create Document '+JSON.stringify(request.data));

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${request.headers?.Authorization}`
        }

       const { data } = await firstValueFrom(
            this.httpService.post<ResponseData<ReportResponse>>(`http://localhost:9005/reports/application-form`,request.data,{headers})
            .pipe(catchError((error: AxiosError) => {

                const notification: Message = this.kycMessagesService.getMessage(MessageCodes.APPLICATION_FORM_NOT_GENERATED);
                throw new KycRestException({message: notification, status: HttpStatus.BAD_GATEWAY, error})
            }))
       );

       return data;
    }

    async createContractDocument(request: RequestData<ContractRequest>): Promise<ResponseData<ReportResponse>>{

        this.logger.log('Create contract '+JSON.stringify(request.data));

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${request.headers?.Authorization}`
        }

       /*const { data } = await firstValueFrom(
            this.httpService.post<ResponseData<ReportResponse>>(`http://localhost:9005/reports/contract`,request.data,{headers})
            .pipe(catchError((error: AxiosError) => {

                const notification: Message = this.kycMessagesService.getMessage(MessageCodes.CONTRACT_DOCUMENT_NOT_GENERATED);
                this.logger.error(error.response);
                throw new KycRestException({message: notification, status: HttpStatus.BAD_GATEWAY, error: error.response?.data})
            }))
       );

       return data;*/
       return Promise.resolve({
        data: {
            id: '1',
            name: 'name',
            mimeType: '',
            size: 1,
            date: ''
        }
       })
    }

}