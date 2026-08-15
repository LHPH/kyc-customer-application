import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'kyc_customer_address' })
export default class KycCustomerAddressEntity {
  @PrimaryColumn({ name: 'id_customer' })
  idCustomer: number;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'street_number', type: 'varchar', nullable: true })
  streetNumber?: string | null;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ name: 'id_neighborhood' })
  idNeighborhood: number;
}
