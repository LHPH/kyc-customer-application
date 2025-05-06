import Message  from "./message"

export interface KycMessages{
    'kyc-messages': KycMessageCatalog
}

export interface KycMessageCatalog{

    catalog: {
        messages: {
            [key: string]: Message
        }
    }
}