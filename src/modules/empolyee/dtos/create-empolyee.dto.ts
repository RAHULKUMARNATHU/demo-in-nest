import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from "class-validator";
import { MESSAGES, REGEX } from "src/utils";

import { Gender } from "../constants";
import { CreateEmpolyeeAddressDto } from "./create-empolyee-address.dto";

export class CreateEmpolyeeDto {
  @ApiProperty({
    description: "Empolyee Name",
    type: String,
    example: "ammy",
  })
  @IsString()
  name: string;

  dateOfBirth?: Date;

  dateOfJoin?: Date;

  dateOfLeave?: Date;

  @ApiProperty({
    description: "Gender",
    type: String,
    example: "male",
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: "Official Email",
    type: String,
    example: "ammy@gmail.com",
  })
  @IsString()
  @IsEmail()
  officialMail: string;

  @ApiProperty({
    description: "Empolyee Password",
    type: String,
    example: "amAn@2022",
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: "Empolyee Number",
    type: String,
    example: "98234125674",
  })
  @IsString()
  mobileNo: string;

  @ApiProperty({
    description: "Empolyee AlterNate Number",
    type: String,
    example: "9456345674",
  })
  @IsString()
  alternateMobileNo: string;

  @ApiProperty({
    description: "Empolyee designation Number",
    type: String,
    example: "Developer",
  })
  @IsString()
  designation: string;

  departId?: number;

  @ApiProperty({
    description: "Empolyee Reporting Manager Id ",
    type: String,
    example: "2",
  })
  @IsString()
  reportingManagerId: string;

  @ApiProperty()
  address: CreateEmpolyeeAddressDto;
}
