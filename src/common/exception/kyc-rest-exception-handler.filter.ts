import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { TypeORMError } from "typeorm";
import { KycMessagesService } from '../services/kyc-message.service';
import { MessageCodes } from '../enums/message-codes';
import Message  from '../interfaces/message';
import ResponseData  from '../interfaces/response-data';
import { KycRestException } from './kyc-rest-exception.exception';

@Catch()
export class KycRestExceptionHandler<T extends HttpException | KycRestException | TypeORMError> implements ExceptionFilter{

    private readonly logger = new Logger(KycRestExceptionHandler.name);

    constructor(private kycMessagesService: KycMessagesService){}

    catch(exception: any, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let notification: Message;
        let status: HttpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
        let level: string = 'ERROR';

        if(exception instanceof TypeORMError){

            status = HttpStatus.SERVICE_UNAVAILABLE;
            notification = this.kycMessagesService.getMessage(MessageCodes.UNAVAILABLE_OPERATION);
            level = notification.type ?? level;
        }
        else if(exception instanceof KycRestException){
            const restExc: KycRestException = exception;
            notification = restExc.params.message ?? this.kycMessagesService.getMessage(MessageCodes.UNEXPECTED_ERROR);
            status = restExc.params.status;
            level = notification.type ?? level;
        }
        else{
            notification = this.kycMessagesService.getMessage(MessageCodes.UNEXPECTED_ERROR);
        }

        if(level === 'WARN'){
            this.logger.warn(`\nCode: ${notification.code}\nMessage: ${notification.message}\nHttp Status: ${status}\n`);
        }
        else {
            this.logger.error(`\nCode: ${notification.code}\nMessage: ${notification.message}\nHttp Status: ${status}\nException: ${exception.stack}\n`);
        }

        const responseJson: ResponseData<any> = {
            data: null,
            error: notification
        };

        response.status(status).json(responseJson);
    }
}