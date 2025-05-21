import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { KycReportService } from './services/kyc-reports.service';

@Global()
@Module({
    imports: [HttpModule],
    providers: [KycReportService],
    exports: [KycReportService]
})
export class ApiModule{}