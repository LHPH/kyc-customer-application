import JwtData from "./jwt-data";

export default interface RequestData<T>{

    params?: {[key: string]: any}
    headers?: {[key: string]: any} | {},
    data?: T | null,
    auth?: JwtData | null
}