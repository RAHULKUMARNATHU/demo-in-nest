import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { OrganizationRole } from "../constants";
@Entity("admins")
export class AdminEntity extends CommonEntity {
  @Column({
    name: "first_name",
    type: "varchar",
    nullable: false,
    length: 50,
  })
  firstName: string;

  @Column({
    name: "last_name",
    type: "varchar",
    nullable: false,
    length: 50,
  })
  lastName: string;

  @Column({
    unique: true,
    name: "email",
    type: "varchar",
    nullable: true,
    length: 50,
  })
  email: string;

  @Column({
    name: "password",
    type: "varchar",
    nullable: false,
  })
  password: string;

  @Column({
    name: "role",
    type: "enum",
    enum: OrganizationRole,
    nullable: false,
  })
  role: OrganizationRole;

  @Column({
    name: "is_super_admin",
    type: "boolean",
    default: false,
    nullable: true,
  })
  isSuperAdmin: boolean;

  // @Column({
  //   name: "email_confirm",
  //   type: "boolean",
  //   default: false,
  // })
  // email_confirm: boolean;
}
