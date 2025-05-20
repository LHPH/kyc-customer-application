export interface GetDocumentResponse{

    documents: DocumentData[]

}

export interface GetDocumentRequest{
    customerId: number,
    folio: number
}

export interface DocumentData{
    id: string,
    name: string
}