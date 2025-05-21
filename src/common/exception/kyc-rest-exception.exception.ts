import { ExceptionOptions } from "./exception-options";

export class KycRestException extends Error{

    constructor(public params: ExceptionOptions){
        super('',{cause: params.error});
    }
}