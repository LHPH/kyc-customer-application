import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm'
import KycServicesEntity from './kyc-services';
import KycCustomerApplicationEntity from './kyc-customer-application';

@Entity({name: 'kyc_customer_service'})
export default class KycCustomerServiceEntity{

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => KycCustomerApplicationEntity, (application) => application.services)
    @JoinColumn({name: 'folio', referencedColumnName: 'id'})
    folio: KycCustomerApplicationEntity;

    @OneToOne(() => KycServicesEntity,
    {
        eager: true
    })
    @JoinColumn({name: 'id_service',referencedColumnName: 'id'})
    service: KycServicesEntity

    @Column({name: 'service_cost'})
    serviceCost: number;

    @Column()
    active: boolean;

    @CreateDateColumn({name: 'creation_date', type: 'timestamp', default: () => 'NOW()'})
    creationDate?: Date;

    @UpdateDateColumn({name: 'modification_date', type: 'timestamp', default: () => 'NOW()'})
    modificationDate?: Date;
}