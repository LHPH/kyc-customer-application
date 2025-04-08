import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import KycServicesEntity from './kyc-services.entity';
import KycChannelEntity from './kyc-channel.entity';
import KycOfficeEntity from './kyc-office.entity';
import KycExecutiveEntity from './kyc-executive.entity';

@Entity()
export class KycCustomerServiceEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => KycServicesEntity)
    @JoinColumn()
    service: KycServicesEntity

    @Column()
    promotionalCode: string;

    @OneToOne(() => KycChannelEntity)
    @JoinColumn()
    channel: KycChannelEntity

    @OneToOne(() => KycOfficeEntity)
    @JoinColumn()
    office: KycOfficeEntity

    @Column()
    active: boolean;

    @Column()
    idCustomer: number;

    @OneToOne(() => KycExecutiveEntity)
    @JoinColumn()
    executive: KycExecutiveEntity

    @Column()
    creationDate: Date;

    @Column()
    modificationDate: Date;
}