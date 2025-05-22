import { BadRequestException, HttpStatus } from "@nestjs/common";
import Message from "../interfaces/message";
import { AxiosError } from "axios";

export class ExceptionUtil{

    static getStringMessage(message: Message, status: HttpStatus, error: any | null): string{

        let strMessage = `\nCode: ${message.code}\n`;
        strMessage = `${strMessage}Message: ${message.message}\n`;
        strMessage = `${strMessage}Http Status: ${status}\n`;

        if(error){

            strMessage = `${strMessage}Exception: ${error.stack}\n`;
            
            const cause = error.cause;
            if(cause instanceof AxiosError){

                strMessage = `${strMessage}Axios Error: ${cause.code}\n`;
                strMessage = `${strMessage}Axios Message: ${cause.message}\n`;

                if(cause.response){

                    strMessage = `${strMessage}Axios Response Data: ${cause.response.data}\n`;
                    strMessage = `${strMessage}Axios Response Status: ${cause.response.status}\n`;
                }
            }

        }

        return strMessage;
    }

    static getMessageBadReqExc(exception: BadRequestException): string{
    
        const response = exception.getResponse();

        if(typeof response === 'string'){
            return response;
        }
        else if(Array.isArray(response)){
            return response.join();
        }
        else if(typeof response === 'object' && 'message' in response){
            return `${response.message ?? ''}`;
        }
        return '';
    }
}