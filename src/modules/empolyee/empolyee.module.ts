import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";

import { EmpolyeeService } from "./services/empolyee.service";
import { EmpolyeeController } from "./controllers/empolyee.controller";
import {
  EmpolyeeAddressEntity,
  EmpolyeeEntity,
  EmpolyeeSkillEntity,
} from "./entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmpolyeeEntity,
      EmpolyeeAddressEntity,
      EmpolyeeSkillEntity,
    ]),
  ],
  controllers: [EmpolyeeController],
  providers: [EmpolyeeService],
})
export class EmpolyeeModule {}
