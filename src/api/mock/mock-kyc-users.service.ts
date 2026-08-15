import { Injectable, Logger } from '@nestjs/common';
import SessionChecking from 'src/common/auth/session-checking';
import { KycUserRole } from 'src/common/enums/kyc-user-role';
import JwtData from 'src/common/interfaces/jwt-data';

@Injectable()
export class MockKycUserService implements SessionChecking {
  private readonly logger = new Logger(MockKycUserService.name);

  sessionChecking(token: string): Promise<JwtData> {
    const jwtData: JwtData = {
      owner: 5,
      user: 1,
      role: KycUserRole.CUSTOMER,
      channel: 1,
    };

    this.logger.warn(
      'USE MOCK FOR SESSION CHECKING ' + JSON.stringify(jwtData),
    );
    return Promise.resolve(jwtData);
  }
}
