import { CommonEntity } from "src/common/entities/common.entity";
import { EmpolyeeEntity } from "src/modules/empolyee/entities";
import { OrganizationEntity } from "src/modules/organization/entities";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity("organization_skills_master")
export class OrganizationSkillEntity extends CommonEntity {
  @Column({
    name: "skill",
    type: "varchar",
    length: 10,
    nullable: false,
  })
  skill: string;

  @ManyToOne(
    () => OrganizationEntity,
    (organization: OrganizationEntity) => organization.skills
  )
  @JoinColumn({ name: "organization_id" })
  public organization: OrganizationEntity;

  @OneToMany(
    () => EmpolyeeEntity,
    (employeeSkill: EmpolyeeEntity) => employeeSkill.empskills
  )
  employeeSkill: EmpolyeeEntity[];
}
