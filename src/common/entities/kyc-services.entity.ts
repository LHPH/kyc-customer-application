import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'kyc_services'})
export default class KycServicesEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cost: number;
}