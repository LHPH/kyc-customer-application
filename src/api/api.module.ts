import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { KycReportService } from './services/kyc-reports.service';
import { CommonModule } from 'src/common/common.module';
import { KycUserService } from './services/kyc-users.service';
import SessionChecking from 'src/common/auth/session-checking';
import { MockKycUserService } from './mock/mock-kyc-users.service';

@Global()
@Module({
    imports: [HttpModule,CommonModule],
    providers: [KycReportService, {
        provide: SessionChecking,
        useClass: KycUserService //MockKycUserService
    }],
    exports: [KycReportService, {
        provide: SessionChecking,
        useClass: KycUserService //MockKycUserService
    }]
})
export class ApiModule{}