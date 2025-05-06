import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'kyc_channel'})
export default class KycChannelEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string
}