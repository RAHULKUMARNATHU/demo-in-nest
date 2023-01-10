import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from "@nestjs/common";
import { OrganizationSkillsService } from "../services/organization-skills.service";
import { CreateOrganizationSkillDto } from "../dto/create-organization-skill.dto";
import { UpdateOrganizationSkillDto } from "../dto/update-organization-skill.dto";
import { PageOptionsDto } from "src/common/dtos";
import { CommonApiResponse } from "src/common/responses";

@Controller("skills")
export class OrganizationSkillsController {
  constructor(
    private readonly organizationSkillsService: OrganizationSkillsService
  ) {}

  @Post()
  async create(
    @Body() createOrganizationSkillDto: CreateOrganizationSkillDto
  ): Promise<CommonApiResponse> {
    const data = await this.organizationSkillsService.create(
      createOrganizationSkillDto
    );
    return {
      status: HttpStatus.OK,
      message: "Skill created successfully",
      data,
    };
  }

  @Get()
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() search: string
  ): Promise<CommonApiResponse> {
    const data = await this.organizationSkillsService.findAll(
      pageOptionsDto,
      search
    );
    return {
      status: HttpStatus.OK,
      message: "Featched Successfully Organization Skills",
      data,
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<CommonApiResponse> {
    const data = await this.organizationSkillsService.findOne(+id);
    return {
      status: HttpStatus.OK,
      message: "Skill found successfully",
      data,
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateOrganizationSkillDto: UpdateOrganizationSkillDto
  ): Promise<CommonApiResponse> {
    const data = await this.organizationSkillsService.update(
      +id,
      updateOrganizationSkillDto
    );
    return {
      status: HttpStatus.OK,
      message: "Skill updated successfully",
      data,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<CommonApiResponse> {
    const data = await this.organizationSkillsService.remove(+id);
    return {
      status: HttpStatus.OK,
      message: "Skill removed successfully",
      data,
    };
  }
}
