import { Injectable } from '@nestjs/common';
import { Notification } from '../interfaces/notification';
import { ConfigService } from '@nestjs/config';
import { KycMessageCatalog } from '../interfaces/kyc-messages.interfaces';

@Injectable()
export class KycMessagesService{

    constructor(private configService: ConfigService){}

    getMessage(code: string): Notification{

        const catalogCatalog: KycMessageCatalog | undefined = this.configService.get<KycMessageCatalog>('kyc-messages');

        if(catalogCatalog){
            
            let notification : Notification = catalogCatalog.catalog.messages[code];

            if(notification){
                return {
                    ...notification,
                    time: new Date()
                };
            }
        }
        return {
            code: '000',
            message: 'Unexpected error',
            type: 'ERROR',
            time: new Date()
        }
    }
}