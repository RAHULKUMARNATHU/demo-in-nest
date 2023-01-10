import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from "class-validator";

import { MESSAGES, REGEX } from "../../../utils";

export class CreateOrganizationDto {
  @ApiProperty({
    description: "Organization name",
    type: String,
    example: "Brainvire",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Organization code",
    type: String,
    example: "BVI01",
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: "Organization official  email id",
    type: String,
    example: "officail@brainvire.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Organizations super admin password",
    type: String,
    example: "Brainvire@123",
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: "Organization location",
    type: String,
    example: "Mumbai",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: "Organization foundation date",
    type: String,
    example: "1999",
  })
  @IsString()
  @IsNotEmpty()
  founded: string;

  @ApiProperty({
    description: "Organization logo url",
    type: String,
    example: "www.brainvire.com/logo",
  })
  @IsString()
  logoUrl: string;

  @ApiProperty({
    description: "Organization website url",
    type: String,
    example: "brainvire.com",
  })
  @IsString()
  websiteUrl: string;
}
