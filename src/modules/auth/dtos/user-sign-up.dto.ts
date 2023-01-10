import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class UserSignupDto {
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  officialMail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @MinLength(10)
  @MaxLength(10)
  phone: number;
}
