import {IsNumber, IsPositive} from 'class-validator'

export class AdjustCustomerContractServiceReq{

    @IsNumber()
    @IsPositive()
    customerId: number

    @IsPositive()
    @IsNumber()
    cost: number
}