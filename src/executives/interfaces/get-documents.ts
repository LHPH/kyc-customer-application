export interface GetDocumentResponse{

    documents: DocumentData[]

}

export interface DocumentData{
    id: string,
    name: string
}