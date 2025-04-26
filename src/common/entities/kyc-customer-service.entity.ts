import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'
import KycServicesEntity from './kyc-services.entity';
import KycCustomerApplicationEntity from './kyc-customer-application.entity';

@Entity({name: 'kyc_customer_service'})
export default class KycCustomerServiceEntity{

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => KycCustomerApplicationEntity, (application) => application.services)
    @JoinColumn({name: 'folio', referencedColumnName: 'id'})
    folio: KycCustomerApplicationEntity;

    @OneToOne(() => KycServicesEntity)
    @JoinColumn({name: 'id_service',referencedColumnName: 'id'})
    service: KycServicesEntity

    @Column({name: 'service_cost'})
    serviceCost: number;

    @Column()
    active: boolean;

    @CreateDateColumn()
    @Column({name: 'creation_date'})
    creationDate?: Date;

    @UpdateDateColumn()
    @Column({name: 'modification_date'})
    modificationDate?: Date;
}