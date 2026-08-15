import { Module } from '@nestjs/common';
import { KycMessagesService } from './services/kyc-message.service';
import { APP_FILTER } from '@nestjs/core';
import { KycRestExceptionHandler } from './exception/kyc-rest-exception-handler.filter';
import { VaultService } from './services/vault.service';

@Module({
  providers: [
    KycMessagesService,
    VaultService,
    {
      provide: APP_FILTER,
      useClass: KycRestExceptionHandler,
    },
  ],
  exports: [KycMessagesService, VaultService],
})
export class CommonModule {}
