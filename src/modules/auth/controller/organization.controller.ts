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
import { OrganizationAuthService } from "../services/organization.service";
import { SystemAdminDto } from "../dtos/system-admin.dto";
import { SystemAdminService } from "../services/systemAdmin.service";
@ApiTags("Auth")
@Controller("organization-login")
export class OrganizationLoginController {
  constructor(
    private readonly organizationAuthService: OrganizationAuthService
  ) {}
  @Post("login")
  async OrganizationLogin(@Body() loginDto: LoginDto): Promise<ApiResponses> {
    const data = await this.organizationAuthService.loginOrganization(loginDto);

    const token = data.access_token;
    return {
      status: HttpStatus.OK,
      message: "Login Successfully",
      data,
    };
  }
}
