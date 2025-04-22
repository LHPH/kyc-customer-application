import { Message } from "./message"

export interface ResponseData<T>{

    data: T | null,
    error?: Message | null
}