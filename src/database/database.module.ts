import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import KycChannelEntity from 'src/common/entities/kyc-channel.entity';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';
import KycExecutiveEntity from 'src/common/entities/kyc-executive.entity';
import KycOfficeEntity from 'src/common/entities/kyc-office.entity';
import KycServicesEntity from 'src/common/entities/kyc-services.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 6000,
        username: 'kyc_user',
        password: 'kyc_pass',
        database: 'kyc_database',
        entities: [KycCustomerServiceEntity, KycOfficeEntity, KycChannelEntity, KycExecutiveEntity, KycServicesEntity],
    })]
})
export class DatabaseModule {}
