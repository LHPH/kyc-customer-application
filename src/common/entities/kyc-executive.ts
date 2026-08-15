import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'kyc_executive' })
export default class KycExecutiveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'second_name' })
  secondName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'second_last_name' })
  secondLastName: string;
}
