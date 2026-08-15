import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import KycCustomerAddressEntity from './kyc-customer-address';

@Entity({ name: 'kyc_customer' })
export default class KycCustomerEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'second_name', type: 'varchar', nullable: true })
  secondName: string | null;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'second_last_name', type: 'varchar', nullable: true })
  secondLastName: string | null;

  @Column()
  rfc: string;

  @Column({ name: 'cell_phone' })
  cellPhone: string;

  @Column()
  email: string;

  @Column()
  active: boolean;

  @OneToOne(() => KycCustomerAddressEntity, { eager: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'idCustomer' })
  address: KycCustomerAddressEntity;
}
