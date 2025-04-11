
export interface AddCustomerContractServiceReq{

    customerId: number,
    contractedServices: CustomerContractService[],
    idOffice: number,
}

export interface CustomerContractService{

    id: number,
    promotionalCode?: string,
}