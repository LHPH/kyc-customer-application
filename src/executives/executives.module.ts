import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import KycCustomerServiceEntity  from 'src/common/entities/kyc-customer-service.entity';
import { CommonModule } from 'src/common/common.module';
import { ExecutiveController } from './executives.controller';
import { ExecutiveService } from './services/executives.service';
import KycChannelEntity from 'src/common/entities/kyc-channel.entity';
import KycServicesEntity from 'src/common/entities/kyc-services.entity';
import KycExecutiveEntity from 'src/common/entities/kyc-executive.entity';
import KycOfficeEntity from 'src/common/entities/kyc-office.entity';
import KycCustomerApplicationEntity from 'src/common/entities/kyc-customer-application.entity';
import KycCustomerEntity from 'src/common/entities/kyc-customer.entity';
import ExecutiveDatabaseService from './services/executive-database.service';
import ExecutiveDocumentService from './services/executive-document.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        KycCustomerServiceEntity,
        KycChannelEntity,
        KycServicesEntity,
        KycExecutiveEntity, 
        KycOfficeEntity, 
        KycCustomerApplicationEntity,
        KycCustomerEntity
    ]),
     CommonModule],
    controllers: [ExecutiveController],
    providers: [ExecutiveService,ExecutiveDatabaseService,ExecutiveDocumentService]
})
export class ExecutivesModule {}
