import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm'
import KycOfferEntity from './kyc-offer';

@Entity({name: 'kyc_campaign'})
export default class KycCampaignEntity{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({name: 'campaign_name'})
    campaignName: string

    @OneToMany(() => KycOfferEntity, (offer) => offer.campaign, {
        eager: true,
        cascade: false,
    })
    @JoinColumn({name: 'id', referencedColumnName: 'id_campaign'})
    offers: KycOfferEntity[];
}