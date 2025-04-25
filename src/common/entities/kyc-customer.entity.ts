import { Entity, Column} from 'typeorm'

@Entity({name: 'kyc_customer'})
export default class KycCustomerEntity{

    @Column()
    id: number;

    @Column({name: 'first_name'})
    firstName: string;

    @Column({name: 'second_name',type: 'varchar', nullable: true})
    secondName: string | null;

    @Column({name: 'last_name'})
    lastName: string

    @Column({name: 'second_last_name',type: 'varchar', nullable: true})
    secondLastName: string | null;

    rfc: string;

    active: boolean;
}