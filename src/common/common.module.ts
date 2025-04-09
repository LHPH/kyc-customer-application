import { Module } from '@nestjs/common';
import { KycMessagesService } from './services/kyc-message.service';

@Module({
    providers: [KycMessagesService],
    exports: [KycMessagesService]
})
export class CommonModule {}
