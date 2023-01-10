import { PartialType } from "@nestjs/swagger";
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { MESSAGES, REGEX } from "src/utils";


export class UpdateUserDto  {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;


}
