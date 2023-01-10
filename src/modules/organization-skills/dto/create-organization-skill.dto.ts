import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OrganizationEntity } from "src/modules/organization/entities";

export class CreateOrganizationSkillDto {
  @IsString()
  @IsNotEmpty()
  skill: string;

  @IsNumber()
  @IsNotEmpty()
  organizationId: OrganizationEntity;
}
