import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateEmpolyeeAddressDto {
  id?: number;

  @ApiProperty({
    description: "Empolyee Address",
    type: String,
    example: "Lotus goregaon(east)",
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: "Address Pincode",
    type: Number,
    example: 400063,
  })
  @IsNumber()
  pinNo: number;

  @ApiProperty({
    description: "Address City",
    type: String,
    example: "Mumbai",
  })
  @IsString()
  city: string;

  @ApiProperty({
    description: "State",
    type: String,
    example: "Maharastra",
  })
  @IsString()
  state: string;
}
