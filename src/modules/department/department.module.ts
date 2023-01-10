import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { DepartmentService } from "./services/department.service";
import { DepartmentController } from "./controllers/department.controller";
import { DepartmentEntity } from "./entities/department.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
