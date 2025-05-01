import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,CreateDateColumn, OneToMany} from 'typeorm'
import KycChannelEntity from './kyc-channel.entity';
import KycOfficeEntity from './kyc-office.entity';
import KycExecutiveEntity from './kyc-executive.entity';
import KycCustomerEntity from './kyc-customer.entity';
import KycCustomerServiceEntity from './kyc-customer-service.entity';
import Promotions from '../interfaces/promotions';

@Entity({name: 'kyc_customer_application'})
export default class KycCustomerApplicationEntity{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({name: 'promotional_code', type: 'varchar', nullable: true })
    promotionalCode: string | null;

    @OneToOne(() => KycChannelEntity)
    @JoinColumn({name: 'id_channel',referencedColumnName: 'id'})
    channel: KycChannelEntity
    
    @OneToOne(() => KycOfficeEntity)
    @JoinColumn({name: 'id_office',referencedColumnName: 'id'})
    office: KycOfficeEntity

    @OneToOne(() => KycCustomerEntity)
    @JoinColumn({name: 'id_customer', referencedColumnName: 'id'})
    customer: KycCustomerEntity

    @OneToOne(() => KycExecutiveEntity)
    @JoinColumn({name: 'id_executive',referencedColumnName: 'id'})
    executive: KycExecutiveEntity

    @Column({name: 'id_campaign',type: 'number', nullable: true})
    idOffer?: number | null

    @Column({name: 'promotions', type: 'jsonb'})
    promotions: Promotions
    
    @CreateDateColumn()
    @Column({name: 'creation_date'})
    creationDate?: Date;

    @OneToMany(() => KycCustomerServiceEntity, (service) => service.folio, {
        eager: true,
        cascade: true
    })
    @JoinColumn({name: 'id', referencedColumnName: 'folio'})
    services: KycCustomerServiceEntity[]
    
}
