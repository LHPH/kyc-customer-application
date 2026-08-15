import { IsNumber, IsPositive } from 'class-validator';

export interface GetDocumentResponse {
  documents: DocumentData[];
}

export class GetDocumentRequest {
  @IsNumber()
  @IsPositive()
  customerId: number;

  @IsPositive()
  @IsNumber()
  folio: number;
}

export interface DocumentData {
  id: string;
  name: string;
}
