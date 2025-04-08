import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'kyc_offices'})
export default class KycOfficeEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}