import { Notification } from "./notification"

export interface ResponseData<T>{

    data: T | null,
    error?: Notification | null
}