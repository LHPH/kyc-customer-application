import Promotions from "./promotions";

export interface KycService{

    folio: number;
    serviceSequential: number,
    serviceType: number,
    service: string,
    promotionalCode?: string,
    cost: number,
    idChannel: number,
    channel: string,
    idOffice: number,
    office: string,
    active: boolean,
    idExecutive: number
    executive: string,
    idOffer?: number | null,
    promotions: Promotions
    creationDate: Date,
    modificationDate?: Date
}