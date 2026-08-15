import { Injectable } from '@nestjs/common';
import Message from '../interfaces/message';
import { ConfigService } from '@nestjs/config';
import { KycMessageCatalog } from '../interfaces/kyc-messages';

@Injectable()
export class KycMessagesService {
  constructor(private configService: ConfigService) {}

  getMessage(code: string): Message {
    const catalogCatalog: KycMessageCatalog | undefined =
      this.configService.get<KycMessageCatalog>('kyc-messages');

    if (catalogCatalog) {
      const notification: Message = catalogCatalog.catalog.messages[code];

      if (notification) {
        return {
          ...notification,
          time: new Date(),
        };
      }
    }
    return {
      code: '000',
      message: 'Unexpected error',
      type: 'ERROR',
      time: new Date(),
    };
  }
}
