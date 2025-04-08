import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './customers.service';
import { CustomerController } from './customers.controller';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([KycCustomerServiceEntity])],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomersModule {}
