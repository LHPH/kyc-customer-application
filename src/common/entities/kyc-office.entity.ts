import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'kyc_office'})
export default class KycOfficeEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}