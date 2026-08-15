import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import SessionChecking from 'src/common/auth/session-checking';
import { MessageCodes } from 'src/common/enums/message-codes';
import { KycRestException } from 'src/common/exception/kyc-rest-exception.exception';
import JwtData from 'src/common/interfaces/jwt-data';
import Message from 'src/common/interfaces/message';
import ResponseData from 'src/common/interfaces/response-data';
import ServicesCatalog from 'src/common/interfaces/services-catalog';
import { KycMessagesService } from 'src/common/services/kyc-message.service';

@Injectable()
export class KycUserService implements SessionChecking {
  private readonly logger = new Logger(KycUserService.name);

  private readonly SERVICE_NAME = 'kyc-users';

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private kycMessagesService: KycMessagesService,
  ) {}

  async sessionChecking(token: string): Promise<JwtData> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    this.logger.log('Call service to check session');
    const serviceCatalog: ServicesCatalog =
      this.configService.get<ServicesCatalog>('services')!;

    const { data } = await firstValueFrom(
      this.httpService
        .get<
          ResponseData<JwtData>
        >(`${serviceCatalog[this.SERVICE_NAME]}/user/session-checking`, { headers })
        .pipe(
          catchError((error: AxiosError) => {
            const notification: Message = this.kycMessagesService.getMessage(
              MessageCodes.UNAUTHORIZED,
            );
            throw new KycRestException({
              message: notification,
              status: HttpStatus.UNAUTHORIZED,
              error,
            });
          }),
        ),
    );
    return data.data!;
  }
}
