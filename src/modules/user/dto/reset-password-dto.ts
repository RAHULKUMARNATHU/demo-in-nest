import { IsString } from "class-validator";

export class ResetPasswordDto {
  @IsString()
  old_password: string;
  @IsString()
  new_password: string;
}
