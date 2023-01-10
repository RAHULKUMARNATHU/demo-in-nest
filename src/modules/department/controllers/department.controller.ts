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
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { CommonApiResponse } from "../../../common/responses";

import { DepartmentService } from "../services/department.service";
import { CreateDepartmentDto } from "../dtos/create-department.dto";
import { UpdateDepartmentDto } from "../dtos/update-department.dto";
import { PageOptionsDto } from "../../../common/dtos";

@Controller("department")
@ApiTags("Department")
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
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "API to create department" })
  @ApiBody({
    type: CreateDepartmentDto,
  })
  @ApiResponse({
    description: "Department sucessfully created",
    status: HttpStatus.OK,
  })
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto
  ): Promise<CommonApiResponse> {
    await this.departmentService.create(createDepartmentDto);
    return {
      status: HttpStatus.CREATED,
      message: "Department sucessfully created",
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to fetched departments" })
  @ApiResponse({
    description: "Departments fetched sucessfully",
    status: HttpStatus.OK,
  })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() search: string
  ): Promise<CommonApiResponse> {
    const data = await this.departmentService.findAll(pageOptionsDto, search);
    return {
      status: HttpStatus.OK,
      message: "Departments fetched sucessfully",
      data,
    };
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to get department" })
  @ApiResponse({
    description: "Department fetched sucessfully",
    status: HttpStatus.OK,
  })
  async findOne(@Param("id") id: string): Promise<CommonApiResponse> {
    const data = await this.departmentService.findOne(+id);
    return {
      status: HttpStatus.OK,
      message: "Department fetched sucessfully",
      data,
    };
  }

  @Patch(":id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: "API to update department by id" })
  @ApiResponse({
    description: "Department updated sucessfully",
    status: HttpStatus.OK,
    type: UpdateDepartmentDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ): Promise<CommonApiResponse> {
    await this.departmentService.update(+id, updateDepartmentDto);
    return {
      status: HttpStatus.ACCEPTED,
      message: "Department updated sucessfullly",
    };
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "API to remove department by id" })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: "Department removed sucessfully",
    status: HttpStatus.OK,
  })
  async remove(@Param("id") id: string): Promise<CommonApiResponse> {
    await this.departmentService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: "Departement deleted sucessfully",
    };
  }
}
