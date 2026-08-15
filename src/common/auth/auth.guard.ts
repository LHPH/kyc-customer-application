import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { KycMessagesService } from '../services/kyc-message.service';
import Message from '../interfaces/message';
import { KycRestException } from '../exception/kyc-rest-exception.exception';
import { MessageCodes } from '../enums/message-codes';
import { Reflector } from '@nestjs/core';
import { KycUserRole } from '../enums/kyc-user-role';
import JwtData from '../interfaces/jwt-data';
import AuthRequest from './auth-request';
import SessionChecking from './session-checking';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private reflector: Reflector,
    private sessionService: SessionChecking,
    private kycMessagesService: KycMessagesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const headers = request.headers;

    if (!headers.authorization || headers.authorization === '') {
      const notification: Message = this.kycMessagesService.getMessage(
        MessageCodes.UNAUTHORIZED,
      );
      throw new KycRestException({
        message: notification,
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const token = headers.authorization.replace('Bearer ', '');

    const roles = this.reflector.get<KycUserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }

    const jwtData: JwtData = await this.sessionService.sessionChecking(token);

    if (!roles.includes(jwtData.role)) {
      const notification: Message = this.kycMessagesService.getMessage(
        MessageCodes.UNAUTHORIZED,
      );
      throw new KycRestException({
        message: notification,
        status: HttpStatus.FORBIDDEN,
      });
    }

    request.auth = jwtData;
    return true;
  }
}
