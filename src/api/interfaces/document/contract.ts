import { Service } from './service';

export interface ContractRequest {
  folio: number;
  customerNumber: number;
  customerName: string;
  customerAddress: string;
  contractedServices: Service[];
}
