import { Notification } from "./notification"

export interface KycMessages{
    'kyc-messages': KycMessageCatalog
}

export interface KycMessageCatalog{

    catalog: {
        messages: {
            [key: string]: Notification
        }
    }
}