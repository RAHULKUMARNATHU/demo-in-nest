import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageDto, PageMetaDto, PageOptionsDto } from "src/common/dtos";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateOrganizationSkillDto } from "../dto/create-organization-skill.dto";
import { UpdateOrganizationSkillDto } from "../dto/update-organization-skill.dto";
import { OrganizationSkillEntity } from "../entities/organization-skill.entity";

@Injectable()
export class OrganizationSkillsService {
  constructor(
    @InjectRepository(OrganizationSkillEntity)
    private readonly organizationSkillsRepository: Repository<OrganizationSkillEntity>
  ) {}
  async create(createOrganizationSkillDto: CreateOrganizationSkillDto) {
    const data = await this.organizationSkillsRepository
      .createQueryBuilder()
      .insert()
      .into("organization_skills")
      .values([
        {
          skill: createOrganizationSkillDto.skill,
          organization: createOrganizationSkillDto.organizationId,
        },
      ])
      .execute();
    return data;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    query: string
  ): Promise<PageDto<OrganizationSkillEntity>> {
    const queryBuilder = this.organizationSkillsRepository.createQueryBuilder(
      "organization_skills"
    );
    queryBuilder
      .orderBy("organization_skills.created_at", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    if (pageOptionsDto.search) {
      queryBuilder.where("organization_skills.skill LIKE :search", {
        search: `%${query.search}%`,
      });
    }
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<OrganizationSkillEntity> {
    const data = this.organizationSkillsRepository
      .createQueryBuilder("organization_skills")
      .where("organization_skills.id = :id", { id: id })
      .getOne();
    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);
    return data;
  }

  async update(
    id: number,
    updateOrganizationSkillDto: UpdateOrganizationSkillDto
  ): Promise<UpdateResult> {
    const data = await this.findOne(id);
    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);
    return this.organizationSkillsRepository
      .createQueryBuilder()
      .update("organization_skills")
      .set(updateOrganizationSkillDto)
      .where("id = :id", { id })
      .execute();
  }

  async remove(id: number): Promise<DeleteResult> {
    const data = await this.findOne(id);
    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);
    const removeData = await this.organizationSkillsRepository
      .createQueryBuilder()
      .delete()
      .from("organization_skills")
      .where("id = :id", { id })
      .execute();
    return removeData;
  }
}
