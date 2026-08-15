import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import KycCampaignEntity from './kyc-campaign';

@Entity({ name: 'kyc_offers' })
export default class KycOfferEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'discount' })
  discount: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ name: 'status' })
  status: number;

  @ManyToOne(() => KycCampaignEntity, (campaign) => campaign.offers, {
    eager: true,
  })
  @JoinColumn({ name: 'id_campaign', referencedColumnName: 'id' })
  campaign: KycCampaignEntity;
}
