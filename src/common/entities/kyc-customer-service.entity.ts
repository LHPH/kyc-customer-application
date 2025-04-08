import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import KycServicesEntity from './kyc-services.entity';
import KycChannelEntity from './kyc-channel.entity';
import KycOfficeEntity from './kyc-office.entity';
import KycExecutiveEntity from './kyc-executive.entity';

@Entity({name: 'kyc_customer_service'})
export class KycCustomerServiceEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => KycServicesEntity)
    @JoinColumn({name: 'id_service',referencedColumnName: 'id'})
    service: KycServicesEntity

    @Column({name: 'promotional_code'})
    promotionalCode: string;

    @OneToOne(() => KycChannelEntity)
    @JoinColumn({name: 'id_channel',referencedColumnName: 'id'})
    channel: KycChannelEntity

    @OneToOne(() => KycOfficeEntity)
    @JoinColumn({name: 'id_office',referencedColumnName: 'id'})
    office: KycOfficeEntity

    @Column()
    active: boolean;

    @Column({name: 'id_customer'})
    idCustomer: number;

    @OneToOne(() => KycExecutiveEntity)
    @JoinColumn({name: 'id_executive',referencedColumnName: 'id'})
    executive: KycExecutiveEntity

    @Column({name: 'creation_date'})
    creationDate: Date;

    @Column({name: 'modification_date'})
    modificationDate: Date;
}