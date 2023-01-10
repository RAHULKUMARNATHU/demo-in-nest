import { CommonEntity } from "src/common/entities/common.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sessions")
export class SessionEntity extends CommonEntity {
  @Column({
    name: "logging_time",
    type: "int",
  })
  loggingTime: number;

  @Column({
    name: "expiry_time",
    type: "int",
  })
  expiryTime: number;
}
