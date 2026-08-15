import { Service } from './service';

export interface ApplicationFormRequest {
  folio: number;
  dateApplication: string;
  total: number;
  campaign?: number | null;
  customerNumber: number;
  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;
  customerRfc: string;
  executiveName: string;
  idExecutive: number;
  idBranch: number;
  branchName: string;
  acceptPromotions: boolean;
  acceptPromotionsEmail: boolean;
  acceptPromotionsCellPhone: boolean;
  services: Service[];
}
