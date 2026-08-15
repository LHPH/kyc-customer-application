import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import KycCustomerServiceEntity from 'src/common/entities/kyc-customer-service';
import { CommonModule } from 'src/common/common.module';
import { ExecutiveController } from './controllers/executives.controller';
import { ExecutiveService } from './services/executives.service';
import KycChannelEntity from 'src/common/entities/kyc-channel';
import KycServicesEntity from 'src/common/entities/kyc-services';
import KycExecutiveEntity from 'src/common/entities/kyc-executive';
import KycOfficeEntity from 'src/common/entities/kyc-office';
import KycCustomerApplicationEntity from 'src/common/entities/kyc-customer-application';
import KycCustomerEntity from 'src/common/entities/kyc-customer';
import ExecutiveDatabaseService from './services/executive-database.service';
import ExecutiveDocumentService from './services/executive-document.service';
import KycOfferEntity from 'src/common/entities/kyc-offer';
import KycCampaignEntity from 'src/common/entities/kyc-campaign';
import KycCustomerAddressEntity from 'src/common/entities/kyc-customer-address';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KycCustomerServiceEntity,
      KycChannelEntity,
      KycServicesEntity,
      KycExecutiveEntity,
      KycOfficeEntity,
      KycCustomerApplicationEntity,
      KycCustomerEntity,
      KycOfferEntity,
      KycCampaignEntity,
      KycCustomerAddressEntity,
    ]),
    CommonModule,
    ApiModule,
  ],
  controllers: [ExecutiveController],
  providers: [
    ExecutiveService,
    ExecutiveDatabaseService,
    ExecutiveDocumentService,
  ],
})
export class ExecutivesModule {}
