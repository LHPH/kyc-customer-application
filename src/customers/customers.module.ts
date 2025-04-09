import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerService } from './customers.service';
import { CustomerController } from './customers.controller';
import { KycCustomerServiceEntity } from 'src/common/entities/kyc-customer-service.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [TypeOrmModule.forFeature([KycCustomerServiceEntity]), CommonModule],
    controllers: [CustomerController],
    providers: [CustomerService]
})
export class CustomersModule {}
