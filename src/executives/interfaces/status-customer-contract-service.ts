import { IsNumber, IsBoolean, IsPositive } from 'class-validator';

export class StatusCustomerContractServiceReq {
  @IsNumber()
  @IsPositive()
  customerId: number;

  @IsBoolean()
  active: boolean;
}
