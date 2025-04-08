import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export default class KycChannelEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string
}