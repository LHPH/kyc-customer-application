import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from "typeorm";
import { KycMessagesService } from './services/kyc-message.service';
import { MessageCodes } from './enums/message-codes.enum';
import { Notification } from './interfaces/notification';
import { ResponseData } from './interfaces/response-data';
import { KycRestException } from './exception/kyc-rest-exception.exception';

@Catch()
export class KycRestExceptionHandler<T extends HttpException | TypeORMError> implements ExceptionFilter{

    constructor(private kycMessagesService: KycMessagesService){}

    catch(exception: any, host: ArgumentsHost) {
        
        console.error("ERROR ",exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let notification: Notification;
        let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

        if(exception instanceof TypeORMError){

            status = HttpStatus.SERVICE_UNAVAILABLE;
            notification = this.kycMessagesService.getMessage(MessageCodes.UNAVAILABLE_OPERATION);
        }
        else if(exception instanceof KycRestException){
            const restExc: KycRestException = exception;
            notification = restExc.params.message ?? this.kycMessagesService.getMessage(MessageCodes.UNEXPECTED_ERROR);
            status = restExc.params.status;
        }
        else{
            notification = this.kycMessagesService.getMessage(MessageCodes.UNEXPECTED_ERROR);
        }

        const responseJson: ResponseData<any> = {
            data: null,
            error: notification
        };

        response.status(status).json(responseJson);
    }
}