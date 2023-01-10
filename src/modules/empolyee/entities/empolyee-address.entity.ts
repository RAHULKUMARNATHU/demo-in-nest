import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { EmpolyeeEntity } from "./empolyee.entity";

@Entity("employees_address")
export class EmpolyeeAddressEntity {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column({
    name: "address",
    type: "varchar",
    nullable: false,
    length: 255,
  })
  address: string;

  @Column({
    name: "pin_no",
    type: "int",
    nullable: false,
  })
  pinNo: number;

  @Column({
    name: "city",
    type: "varchar",
    nullable: false,
    length: 50,
  })
  city: string;

  @Column({
    name: "state",
    type: "varchar",
    nullable: false,
    length: 50,
  })
  state: string;

  @OneToOne(
    () => EmpolyeeEntity,
    (empolyee: EmpolyeeEntity) => empolyee.address,
    { onDelete: "CASCADE" }
  )
  empolyees: EmpolyeeEntity;
}
