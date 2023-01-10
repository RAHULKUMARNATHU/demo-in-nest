import { CommonEntity } from "src/common/entities/common.entity";
import { Organization } from "src/modules/auth/constants";
import { DepartmentEntity } from "src/modules/department/entities/department.entity";
import { OrganizationSkillEntity } from "src/modules/organization-skills/entities/organization-skill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity("organizations")
export class OrganizationEntity extends CommonEntity {
  @Column({
    type: "varchar",
    unique: true,
    length: 65,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 65,
  })
  code: string;

  @Column({
    type: "varchar",
    name: "email",
    unique: true,
    length: 55,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false,
    length: 55,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  location: string;

  @Column({
    type: Date,
  })
  founded: Date;

  @Column({
    type: "varchar",
    name: "logo_url",
  })
  logoUrl: string;

  @Column({
    type: "varchar",
    name: "website_url",
  })
  websiteUrl: string;

  @Column({
    name: "role",
    type: "enum",
    enum: Organization,
    default: Organization.ORGANIZATION,
    nullable: true,
  })
  role: Organization;

  @OneToMany(() => DepartmentEntity, (department) => department.organization)
  departments: DepartmentEntity[];

  @OneToMany(
    () => OrganizationSkillEntity,
    (skills: OrganizationSkillEntity) => skills.organization
  )
  skills: OrganizationSkillEntity[];
}
