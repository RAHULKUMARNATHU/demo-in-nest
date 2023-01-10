import { Module } from "@nestjs/common";
import { OrganizationSkillsService } from "./services/organization-skills.service";
import { OrganizationSkillsController } from "./controller/organization-skills.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationSkillEntity } from "./entities/organization-skill.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationSkillEntity])],
  controllers: [OrganizationSkillsController],
  providers: [OrganizationSkillsService],
})
export class OrganizationSkillsModule {}
