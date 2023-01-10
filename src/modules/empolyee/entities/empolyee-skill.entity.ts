import { CommonEntity } from "src/common/entities/common.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EmpolyeeEntity } from "./empolyee.entity";

@Entity("empolyee_skills")
export class EmpolyeeSkillEntity extends CommonEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({
    name: "name",
    type: "varchar",
    nullable: false,
    length: 50,
  })
  name: string;

  @ManyToOne(() => EmpolyeeEntity, (empolyees) => empolyees.skills)
  @JoinColumn({ name: "empolye_id" })
  empolyees: EmpolyeeEntity;
}
