import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from "@nestjs/common";
import { SessionInterceptor } from "../../../interceptors/auth-user-interceptor.service";
import { AuthGuard } from "../../../gaurd/auth.guard";
import { AuthService } from "../services/auth.service";
import { curentUser } from "../../../decorators/customer.decorator";
import { RegisterAdminDto } from "../dtos/admin-sign-up.dto";
import { ApiResponses } from "../../utils/common.response/common.api.response";
import { LoginDto } from "../dtos/login-user.dto";
import { ApiTags } from "@nestjs/swagger";
import { SystemAdminDto } from "../dtos/system-admin.dto";
import { SystemAdminService } from "../services/systemAdmin.service";
@ApiTags("Auth")
@Controller("systemadmin")
export class SystemAdminController {
  constructor(private readonly systemAdminService: SystemAdminService) {}

  @Post("register")
  async create(@Body() systemAdminDto: SystemAdminDto): Promise<ApiResponses> {
    await this.systemAdminService.systemAdminSignUp(systemAdminDto);
    return {
      status: HttpStatus.OK,
      message: "Registration successfully",
    };
  }
  @Post("login")
  async adminLogin(@Body() loginDto: LoginDto): Promise<ApiResponses> {
    const data = await this.systemAdminService.loginSystemAdmin(loginDto);

    const token = data.access_token;
    return {
      status: HttpStatus.OK,
      message: "Login Successfully",
      data,
    };
  }
}
