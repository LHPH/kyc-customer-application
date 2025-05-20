import {IsAlphanumeric, IsArray, IsNumber, IsObject, IsOptional, IsPositive} from 'class-validator'
import Promotions from "src/common/interfaces/promotions";

export class AddCustomerContractServiceReq{

    @IsNumber()
    @IsPositive()
    customerId: number

    @IsOptional()
    @IsAlphanumeric()
    promotionalCode?: string

    @IsArray()
    contractedServices: CustomerContractService[]

    @IsNumber()
    @IsPositive()
    idOffice: number

    @IsNumber()
    @IsPositive()
    @IsOptional()
    idOffer?: number

    @IsObject()
    promotions: Promotions
}

export class CustomerContractService{

    @IsPositive()
    @IsNumber()
    id: number
}

export interface AddCustomerContractServiceResp{

    folio: number;
}