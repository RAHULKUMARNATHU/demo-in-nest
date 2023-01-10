import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { OrganizationRole } from "../constants";
export class RegisterAdminDto {
  adminId?: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "password too weak",
  })
  password: string;

  @IsEnum(OrganizationRole)
  @IsNotEmpty()
  role: OrganizationRole;

  isEmailConfirmed?: boolean;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
