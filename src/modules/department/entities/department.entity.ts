import { CommonEntity } from "src/common/entities/common.entity";
import { OrganizationEntity } from "src/modules/organization/entities";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity("departments")
export class DepartmentEntity extends CommonEntity {
  @Column({
    type: "varchar",
    unique: true,
    length: 65,
  })
  name: string;

  @Column({
    type: "varchar",
    unique: true,
    length: 50,
  })
  code: string;

  @Column({
    name: "is_active",
    default: true,
  })
  isActive: boolean;

  @ManyToOne(
    () => OrganizationEntity,
    (organization) => organization.departments
  )
  @JoinColumn({ name: "organization_id" })
  organization: OrganizationEntity;
}
