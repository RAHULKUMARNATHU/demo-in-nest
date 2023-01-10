import { Controller, Post, Body, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { RegisterAdminDto } from "../dtos/admin-sign-up.dto";
import { ApiResponses } from "../../utils/common.response/common.api.response";
import { LoginDto } from "../dtos/login-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthenticationGuard } from "src/gaurd/jwt.auth.guard";
import { RolesGuard } from "src/gaurd/role.guard";
import { Roles } from "src/gaurd/roles.decorator";
import { Role } from "../constants/role.enum";
@ApiTags("Auth")
@Controller("organization-admin")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Roles(Role.ORGANIZATION)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Post("register")
  async create(
    @Body() registerAdminDto: RegisterAdminDto
  ): Promise<ApiResponses> {
    await this.authService.adminSignUp(registerAdminDto);
    return {
      status: HttpStatus.OK,
      message: "Registration successfully",
    };
  }

  // @Get("confirm-email/:token")
  // async confirm(@Param("token") token: string): Promise<ApiResponses> {
  //   const email = await this.authService.decodeConfirmationToken(token);
  //   await this.authService.confirmEmail(email);

  //   return {
  //     status: HttpStatus.OK,
  //     message: "Email verified successfully",
  //   };
  // }

  @Post("login")
  async adminLogin(@Body() loginDto: LoginDto): Promise<ApiResponses> {
    const data = await this.authService.login(loginDto);

    const token = data.access_token;
    return {
      status: HttpStatus.OK,
      message: "Login Successfully",
      data,
    };
  }
}
