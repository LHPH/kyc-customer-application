import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './services/customers.service';
import { CustomerController } from './customers.controller';
import KycCustomerServiceEntity  from 'src/common/entities/kyc-customer-service.entity';
import { CommonModule } from 'src/common/common.module';
import KycCustomerApplicationEntity from 'src/common/entities/kyc-customer-application.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        KycCustomerServiceEntity, 
        KycCustomerApplicationEntity]
    ), 
    CommonModule],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomersModule {}
