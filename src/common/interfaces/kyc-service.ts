import Promotions from './promotions';

export interface KycService {
  folio: number;
  serviceSequential: number;
  serviceType: number;
  service: string;
  promotionalCode?: string;
  cost: number;
  idChannel: number;
  channel: string;
  idOffice: number;
  office: string;
  active: boolean;
  idExecutive: number;
  executive: string;
  idOffer?: number | null;
  campaign?: string;
  promotions: Promotions;
  creationDate: Date;
  modificationDate?: Date;
}
