import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { OrganizationSkillEntity } from "src/modules/organization-skills/entities/organization-skill.entity";

export class CreateEmpolyeeSkillDto {
  id?: number;

  @ApiProperty({
    description: "Skills Name",
    type: String,
    example: "Java",
  })
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  organizationSkillId: OrganizationSkillEntity[];
}
