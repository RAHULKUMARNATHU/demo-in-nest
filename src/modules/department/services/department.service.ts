import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PageDto, PageMetaDto, PageOptionsDto } from "src/common/dtos";
import { CreateDepartmentDto } from "../dtos/create-department.dto";
import { UpdateDepartmentDto } from "../dtos/update-department.dto";
import { DepartmentEntity } from "../entities/department.entity";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private departmentRepository: Repository<DepartmentEntity>
  ) {}

  async create(
    createDepartmentDto: CreateDepartmentDto
  ): Promise<DepartmentEntity> {
    const data = await this.departmentRepository.save(createDepartmentDto); //TODO
    return data;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    query: string
  ): Promise<PageDto<DepartmentEntity>> {
    const queryBuilder =
      this.departmentRepository.createQueryBuilder("departments");
    queryBuilder
      .orderBy("departments.created_at", pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    if (pageOptionsDto.search) {
      queryBuilder.where("departments.name LIKE :search", {
        search: `%${query.search}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<DepartmentEntity> {
    const data = await this.departmentRepository
      .createQueryBuilder("departments")
      .where("departments.id = :id", { id })
      .getOne();

    if (!data) throw new HttpException("Invalid Id", HttpStatus.BAD_REQUEST);
    return data;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const data = await this.findOne(id);

    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);

    return this.departmentRepository
      .createQueryBuilder()
      .update(DepartmentEntity)
      .set(updateDepartmentDto)
      .where("id = :id", { id: id })
      .execute();
  }

  async remove(id: number) {
    const data = await this.findOne(id);

    if (!data) throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);

    const removeData = await this.departmentRepository
      .createQueryBuilder()
      .delete()
      .from(DepartmentEntity)
      .where("id = :id", { id: id })
      .execute();
    return removeData;
  }
}
