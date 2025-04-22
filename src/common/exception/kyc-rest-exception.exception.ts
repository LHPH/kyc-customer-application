import { ExceptionOptions } from "./exception-options.interface";

export class KycRestException extends Error{

    constructor(public params: ExceptionOptions){
        super();
    }
}