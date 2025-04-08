
export interface KycService{

    id: number,
    idService: number,
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
    creationDate: string,
    modificationDate?: string
}