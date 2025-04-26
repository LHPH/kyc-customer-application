
export interface AddCustomerContractServiceReq{

    customerId: number,
    promotionalCode?: string,
    contractedServices: CustomerContractService[],
    idOffice: number,
}

export interface CustomerContractService{

    id: number
}

export interface AddCustomerContractServiceResp{

    folio: number;
}