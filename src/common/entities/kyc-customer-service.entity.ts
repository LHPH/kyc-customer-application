import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'
import KycServicesEntity from './kyc-services.entity';
import KycChannelEntity from './kyc-channel.entity';
import KycOfficeEntity from './kyc-office.entity';
import KycExecutiveEntity from './kyc-executive.entity';

@Entity({name: 'kyc_customer_service'})
export class KycCustomerServiceEntity{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    folio: number;

    @OneToOne(() => KycServicesEntity)
    @JoinColumn({name: 'id_service',referencedColumnName: 'id'})
    service: KycServicesEntity

    @Column({name: 'promotional_code', type: 'varchar', nullable: true })
    promotionalCode: string | null;

    @Column({name: 'service_cost'})
    serviceCost: number;

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

    @CreateDateColumn()
    @Column({name: 'creation_date'})
    creationDate?: Date;

    @UpdateDateColumn()
    @Column({name: 'modification_date'})
    modificationDate?: Date;
}