import {IsNumber} from 'class-validator'

export interface GetDocumentResponse{

    documents: DocumentData[]

}

export class GetDocumentRequest{
    @IsNumber()
    customerId: number
    @IsNumber()
    folio: number
}

export interface DocumentData{
    id: string,
    name: string
}