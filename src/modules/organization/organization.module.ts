import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrganizationController } from "./controllers";
import { OrganizationService } from "./services";
import { OrganizationEntity } from "./entities";
import { RolesGuard } from "../../gaurd/role.guard";
import { AdminEntity } from "../auth/entities/admins.entity";
import { JwtStrategy } from "../../gaurd/jwt.strategy";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity, AdminEntity])],
  controllers: [OrganizationController],
  providers: [OrganizationService, JwtStrategy, RolesGuard],
})
export class OrganizationModule {}
