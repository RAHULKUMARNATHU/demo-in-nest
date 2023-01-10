import { IsString } from "class-validator";

export class UpdateEmpolyeeSkillDto {
  @IsString()
  name: string;
}
