import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Employee, Gender } from "../constants";

import { CommonEntity } from "src/common/entities/common.entity";
import { EmpolyeeAddressEntity } from "./empolyee-address.entity";
import { EmpolyeeSkillEntity } from "./empolyee-skill.entity";
import { OrganizationSkillEntity } from "src/modules/organization-skills/entities/organization-skill.entity";

@Entity("employees")
export class EmpolyeeEntity extends CommonEntity {
  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    length: 59,
  })
  name: string;

  @Column({
    name: "date_of_birth",
    type: Date,
    nullable: true,
  })
  dateOfBirth: Date;

  @Column({
    name: "date_of_join",
    type: Date,
    nullable: true,
  })
  dateOfJoin: Date;

  @Column({
    name: "date_of_leave",
    type: Date,
    nullable: true,
  })
  dateOfLeave: Date;

  @Column({
    name: "gender",
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column({
    name: "official_mail",
    type: "varchar",
    length: 50,
    nullable: false,
    unique: true,
  })
  officialMail: string;

  @Column({
    name: "password",
    type: "varchar",
    nullable: false,
    length: 255,
  })
  password: string;

  @Column({
    name: "mobile_no",
    nullable: false,
    type: "varchar",
    length: 50,
  })
  mobileNo: string;

  @Column({
    name: "role",
    type: "enum",
    enum: Employee,
    default: Employee.EMPLOYEE,
    nullable: true,
  })
  role: Employee;

  @Column({ name: "alternate_mobile_no", type: "varchar", nullable: false })
  alternateMobileNo: string;

  @Column({
    name: "designation",
    type: "varchar",
    nullable: false,
    length: 50,
  })
  designation: string;

  @Column({
    name: "dept_id",
    type: "int",
    nullable: true,
  })
  deptId?: number;

  @Column({
    name: "reporting_manager_id",
    type: "varchar",
    nullable: false,
    length: 255,
  })
  reportingManagerId: string;

  @OneToOne(() => EmpolyeeAddressEntity, {
    onDelete: "CASCADE",
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "address_id" })
  address: EmpolyeeAddressEntity;

  @OneToMany(() => EmpolyeeSkillEntity, (skill) => skill)
  skills: EmpolyeeSkillEntity[];

  @ManyToOne(
    () => OrganizationSkillEntity,
    (empskills: OrganizationSkillEntity) => empskills.employeeSkill
  )
  @JoinColumn({ name: "organizationSkillId" })
  empskills: OrganizationSkillEntity;
}
