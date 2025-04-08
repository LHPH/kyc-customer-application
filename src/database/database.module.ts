import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import KycChannelEntity from 'src/common/entities/kyc-channel.entity';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';
import KycExecutiveEntity from 'src/common/entities/kyc-executive.entity';
import KycOfficeEntity from 'src/common/entities/kyc-office.entity';
import KycServicesEntity from 'src/common/entities/kyc-services.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_SECRET'),
            database: configService.get('DATABASE_NAME'),
            entities: [KycCustomerServiceEntity, KycOfficeEntity, KycChannelEntity, KycExecutiveEntity, KycServicesEntity],
        }),
        inject: [ConfigService]
    })]
})
export class DatabaseModule {}
