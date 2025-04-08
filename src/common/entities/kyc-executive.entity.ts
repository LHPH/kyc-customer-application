import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export default class KycExecutiveEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    secondName: string;

    @Column()
    lastName: string;

    @Column()
    secondLastName: string;

}