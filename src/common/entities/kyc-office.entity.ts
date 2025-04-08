import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export default class KycOfficeEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}