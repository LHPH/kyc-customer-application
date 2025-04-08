import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export default class KycServicesEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}