import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiResponse,
} from "@nestjs/swagger";

import { OrganizationService } from "../services";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../dtos";
import { CommonApiResponse } from "../../../common/responses";
import { OrganizationEntity } from "../entities";
import { PageOptionsDto } from "src/common/dtos";
import { RolesGuard } from "src/gaurd/role.guard";
import { Roles } from "src/gaurd/roles.decorator";
import { Role } from "src/modules/auth/constants";
import { JwtAuthenticationGuard } from "src/gaurd/jwt.auth.guard";

@Controller("organization")
@ApiTags("Organization")
@Controller("organization")
@ApiTags("Organization")
@ApiBadRequestResponse({
  description: "Bad Request",
  schema: {
    example: {
      status: HttpStatus.BAD_REQUEST,
      message: "Bad Rerquest",
      error: "Bad Request",
    },
  },
})
@ApiUnauthorizedResponse({
  description: "Unauthorised Access",
  schema: {
    example: {
      status: HttpStatus.UNAUTHORIZED,
      message: "Unauthorised Access",
      error: "Unauthorised",
    },
  },
})
@ApiInternalServerErrorResponse({
  description: "Internal service error",
  schema: {
    example: {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Something went wrong",
      error: "Internal service error",
    },
  },
})
@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @Roles(Role.SYSTEMADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to create organization" })
  @ApiResponse({
    description: "Organization Created sucessfully",
    status: HttpStatus.OK,
    type: CreateOrganizationDto,
  })
  @ApiBody({
    type: CreateOrganizationDto,
  })
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto
  ): Promise<CommonApiResponse> {
    const data = await this.organizationService.create(createOrganizationDto);
    return {
      status: HttpStatus.CREATED,
      message: "Organization Created successfully",
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to get all organizations" })
  @ApiResponse({
    description: "Organizations fetched successfully",
    status: HttpStatus.OK,
    type: [OrganizationEntity],
  })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() search: string
  ): Promise<CommonApiResponse> {
    const data = await this.organizationService.findAll(pageOptionsDto, search);
    return {
      status: HttpStatus.OK,
      message: "Departments fetched successfully",
      data,
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to get organization by id" })
  @ApiResponse({
    description: "Organization fetched successfully",
    status: HttpStatus.OK,
    type: OrganizationEntity,
  })
  async findOne(@Param("id") id: string): Promise<CommonApiResponse> {
    const data = this.organizationService.findOne(+id);
    return {
      status: HttpStatus.OK,
      message: "Organization fetched sucessfully",
      data,
    };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to update organization by id" })
  @ApiBody({
    type: UpdateOrganizationDto,
  })
  @ApiResponse({
    description: "Organization updated sucessfully",
    status: HttpStatus.OK,
    type: UpdateOrganizationDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ): Promise<CommonApiResponse> {
    await this.organizationService.update(+id, updateOrganizationDto);
    return {
      status: HttpStatus.OK,
      message: "Organization updated sucessfully",
    };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to remove organization by id" })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UpdateOrganizationDto,
  })
  @ApiResponse({
    description: "Organization removed sucessfully",
    status: HttpStatus.OK,
  })
  async remove(@Param("id") id: string): Promise<CommonApiResponse> {
    await this.organizationService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: "Organization deleted sucessfully",
    };
  }
}
