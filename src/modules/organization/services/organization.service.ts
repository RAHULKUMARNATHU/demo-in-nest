import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PageDto, PageMetaDto, PageOptionsDto } from "src/common/dtos";
import { AdminEntity } from "src/modules/auth/entities/admins.entity";
import { Repository } from "typeorm";

import { CreateOrganizationDto, UpdateOrganizationDto } from "../dtos";
import { OrganizationEntity } from "../entities";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private organizationRepository: Repository<OrganizationEntity>
  ) {}

  async create(
    createOrganizationDto: CreateOrganizationDto
  ): Promise<OrganizationEntity> {
    const data = this.organizationRepository.save(createOrganizationDto);
    console.log("data", data);

    return data;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    query: string
  ): Promise<PageDto<OrganizationEntity>> {
    const queryBuilder =
      this.organizationRepository.createQueryBuilder("organizations");
    queryBuilder
      .orderBy("organizations.created_at", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    if (pageOptionsDto.search) {
      queryBuilder.where("organizations.name LIKE :search", {
        search: `%${query.search}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<OrganizationEntity> {
    const data = await this.organizationRepository
      .createQueryBuilder("organizations")
      .where("organizations.id = :id", { id })
      .getOne();

    if (!data) throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST);
    return data;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    // TODO
    const data = await this.findOne(id);

    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);

    return this.organizationRepository
      .createQueryBuilder()
      .update(OrganizationEntity)
      .set(updateOrganizationDto)
      .where("id = :id", { id: id })
      .execute();
  }

  async remove(id: number) {
    // TODO
    const data = await this.findOne(id);

    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);

    const removeData = await this.organizationRepository
      .createQueryBuilder()
      .delete()
      .from(OrganizationEntity)
      .where("id = :id", { id: id })
      .execute();
    return removeData;
  }
}
