import Promotions from "src/common/interfaces/promotions";

export interface AddCustomerContractServiceReq{

    customerId: number,
    promotionalCode?: string,
    contractedServices: CustomerContractService[],
    idOffice: number,
    idOffer?: number,
    promotions: Promotions
}

export interface CustomerContractService{

    id: number
}

export interface AddCustomerContractServiceResp{

    folio: number;
}