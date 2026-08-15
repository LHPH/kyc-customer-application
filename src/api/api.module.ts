import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KycReportService } from './services/kyc-reports.service';
import { CommonModule } from 'src/common/common.module';
import { KycUserService } from './services/kyc-users.service';
import SessionChecking from 'src/common/auth/session-checking';
import { MockKycUserService } from './mock/mock-kyc-users.service';
import { ConfigModule } from '@nestjs/config';
import { parseStringToBoolean } from 'src/common/util/functions.util';

@Module({
  imports: [HttpModule, CommonModule, ConfigModule],
  providers: [
    KycReportService,
    {
      provide: SessionChecking,
      useClass: parseStringToBoolean(process.env.ENABLE_MOCK)
        ? MockKycUserService
        : KycUserService,
    },
  ],
  exports: [
    KycReportService,
    {
      provide: SessionChecking,
      useClass: parseStringToBoolean(process.env.ENABLE_MOCK)
        ? MockKycUserService
        : KycUserService,
    },
  ],
})
export class ApiModule {}
