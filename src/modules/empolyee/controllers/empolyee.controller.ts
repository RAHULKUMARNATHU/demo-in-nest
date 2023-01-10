import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { EmpolyeeService } from "../services/empolyee.service";
import { CommonApiResponse } from "../../../common/responses";
import {
  CreateEmpolyeeDto,
  CreateEmpolyeeSkillDto,
  UpdateEmpolyeeDto,
  UpdateEmpolyeeSkillDto,
} from "../dtos";
import { PageOptionsDto, PageDto } from "../../../common/dtos";
import { EmpolyeeSkillEntity } from "../entities";
import { Roles } from "src/gaurd/roles.decorator";
import { Role } from "src/modules/auth/constants/role.enum";
import { JwtAuthenticationGuard } from "src/gaurd/jwt.auth.guard";
import { RolesGuard } from "src/gaurd/role.guard";

@Controller("empolyee")
@ApiTags("Empolyess")
@Roles(Role.ORGANIZATION, Role.SUPERADMIN, Role.ADMIN)
@UseGuards(JwtAuthenticationGuard, RolesGuard)
export class EmpolyeeController {
  constructor(private readonly empolyeeService: EmpolyeeService) {}

  @Post()
  async create(
    @Body() createEmpolyeeDto: CreateEmpolyeeDto
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.create(createEmpolyeeDto);

    return {
      status: HttpStatus.CREATED,
      message: "Empolyee Created SuccessFully",
      data,
    };
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() search: string
  ): Promise<PageDto<CreateEmpolyeeDto>> {
    return await this.empolyeeService.findAll(pageOptionsDto, search);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.findOne(id);

    return {
      status: HttpStatus.OK,
      message: "your data",
      data,
    };
  }

  @Patch(":id")
  @Roles(Role.ORGANIZATION, Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEmpolyeeDto: UpdateEmpolyeeDto
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.update(id, updateEmpolyeeDto);

    return {
      status: HttpStatus.ACCEPTED,
      message: "Updated Empolyee Details SuccesFully",
      data,
    };
  }

  @Delete(":id")
  @Roles(Role.ORGANIZATION, Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  async remove(
    @Param("id", ParseIntPipe) id: string
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: "Delted Successfully",
      data,
    };
  }

  @Post(":uuild/skill")
  async createSkill(
    empolyeeSkillDto: CreateEmpolyeeSkillDto
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.createSkill(empolyeeSkillDto);
    return {
      status: HttpStatus.CREATED,
      message: "Added Skill Successfully",
      data,
    };
  }

  @Get(":id/skill")
  async findOneSkills(
    @Param("id", ParseIntPipe) id: number
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.findOneSkill(id);

    return {
      status: HttpStatus.OK,
      message: "your data",
      data,
    };
  }

  @Patch(":id/skill")
  async updateSkill(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateEmpolyeeSkillDto: UpdateEmpolyeeSkillDto
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.updateSkill(
      id,
      updateEmpolyeeSkillDto
    );

    return {
      status: HttpStatus.ACCEPTED,
      message: "Updated Empolyee Skill SuccesFully",
      data,
    };
  }

  @Delete(":id/skill")
  async removeSkill(
    @Param("id", ParseIntPipe) id: string
  ): Promise<CommonApiResponse> {
    const data = await this.empolyeeService.removeSkill(+id);
    return {
      status: HttpStatus.OK,
      message: "Delted skill Successfully",
      data,
    };
  }

  @Get(":id/skills")
  async findAllSkills(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() search: string
  ): Promise<PageDto<EmpolyeeSkillEntity>> {
    return await this.empolyeeService.findAllSkills(pageOptionsDto, search);
  }
}
