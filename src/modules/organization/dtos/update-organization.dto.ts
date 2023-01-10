import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateOrganizationDto } from "./create-organization.dto";

export class UpdateOrganizationDto {
  @ApiProperty({
    description: "Organization Name",
    type: String,
    example: "Brainvire",
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Organization Name",
    type: String,
    example: "Brainvire",
  })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({
    description: "Organization Name",
    type: String,
    example: "1999",
  })
  @IsOptional()
  @IsString()
  founded: string;

  @ApiProperty({
    description: "Organization logo url",
    type: String,
    example: "www.brainvire.com/logo",
  })
  @IsOptional()
  @IsString()
  logoUrl: string;

  @ApiProperty({
    description: "Organization website url",
    type: String,
    example: "brainvire.com",
  })
  @IsOptional()
  @IsString()
  websiteUrl: string;
}
