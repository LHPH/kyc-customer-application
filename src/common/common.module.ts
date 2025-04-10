import { Module } from '@nestjs/common';
import { KycMessagesService } from './services/kyc-message.service';
import { APP_FILTER } from '@nestjs/core';
import { KycRestExceptionHandler } from './kyc-rest-exception-handler.filter';

@Module({
    providers: [
        KycMessagesService,
        {
            provide: APP_FILTER,
            useClass: KycRestExceptionHandler
        }
    ],
    exports: [KycMessagesService]
})
export class CommonModule {}
