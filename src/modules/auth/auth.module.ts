import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controller/admins.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmpolyeeEntity, EmpolyeeSkillEntity } from "../empolyee/entities";
import { EmpolyeeService } from "../empolyee/services/empolyee.service";
import { JwtService } from "@nestjs/jwt";
import { AdminEntity } from "./entities/admins.entity";
import EmailService from "../utils/EmailService/email.service";
import { employeeAuthService } from "./services";
import { SystemAdminController } from "./controller/systemAdmin.controller";
import { EmployeeController } from "./controller";
import { SystemAdminService } from "./services/systemAdmin.service";
import { SystemAdminEntity } from "./entities/systemAdmin.entity";
import { OrganizationLoginController } from "./controller/organization.controller";
import { OrganizationAuthService } from "./services/organization.service";
import { OrganizationEntity } from "../organization/entities";
@Module({
  imports: [
    TypeOrmModule.forFeature([
      EmpolyeeEntity,
      AdminEntity,
      EmpolyeeSkillEntity,
      SystemAdminEntity,
      OrganizationEntity,
    ]),
  ],
  controllers: [
    AuthController,
    SystemAdminController,
    EmployeeController,
    OrganizationLoginController,
  ],
  providers: [
    AuthService,
    EmpolyeeService,
    JwtService,
    employeeAuthService,
    EmailService,
    SystemAdminService,
    OrganizationAuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
