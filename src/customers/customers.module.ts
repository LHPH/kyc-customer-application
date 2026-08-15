import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './services/customers.service';
import { CustomerController } from './controllers/customers.controller';
import KycCustomerServiceEntity from 'src/common/entities/kyc-customer-service';
import { CommonModule } from 'src/common/common.module';
import KycCustomerApplicationEntity from 'src/common/entities/kyc-customer-application';
import { ApiModule } from 'src/api/api.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      KycCustomerServiceEntity,
      KycCustomerApplicationEntity,
    ]),
    CommonModule,
    ApiModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomersModule {}
