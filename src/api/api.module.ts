import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { KycReportService } from './services/kyc-reports.service';
import { CommonModule } from 'src/common/common.module';

@Global()
@Module({
    imports: [HttpModule,CommonModule],
    providers: [KycReportService],
    exports: [KycReportService]
})
export class ApiModule{}