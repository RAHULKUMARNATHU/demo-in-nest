import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsOptional } from "class-validator";

export class UpdateDepartmentDto {
  @ApiProperty({
    description: "Department Name",
    type: String,
    example: "Systems",
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Deaprtment Code",
    type: String,
    example: "12AB6KHN6",
  })
  @IsString()
  @IsOptional()
  code: string;

  @ApiProperty({
    description: "Organization flag",
    type: String,
    example: "true",
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
