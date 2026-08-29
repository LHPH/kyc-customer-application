import { Injectable, Logger } from '@nestjs/common';
import SessionChecking from 'src/common/auth/session-checking';
import { KycUserRole } from 'src/common/enums/kyc-user-role';
import JwtData from 'src/common/interfaces/jwt-data';
import { parseStringToNumber } from '../../common/util/functions.util';

@Injectable()
export class MockKycUserService implements SessionChecking {
  private readonly logger = new Logger(MockKycUserService.name);

  sessionChecking(token: string): Promise<JwtData> {
    const parts = token.split('-');
    const role = parts[0] || 'CUSTOMER';
    const user = parseStringToNumber(parts[1], 1);
    const owner: any = parseStringToNumber(parts[2], 1);

    let selectedRole: KycUserRole = KycUserRole.CUSTOMER;
    for (const [key, value] of Object.entries(KycUserRole)) {
      if (role === key) {
        selectedRole = value;
        break;
      }
    }

    const jwtData: JwtData = {
      owner: owner,
      user: user,
      role: selectedRole,
      channel: 1,
    };

    this.logger.warn(
      'USE MOCK FOR SESSION CHECKING ' + JSON.stringify(jwtData),
    );
    return Promise.resolve(jwtData);
  }
}
