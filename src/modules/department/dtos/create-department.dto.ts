import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({
    description: "Department name",
    type: String,
    example: "Systems",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Deaprtment code",
    type: String,
    example: "12AB6KHN6",
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: "Organization status",
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
