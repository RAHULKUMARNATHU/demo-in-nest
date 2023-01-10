import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { DeleteResult, Repository, UpdateResult } from "typeorm";

import {
  CreateEmpolyeeAddressDto,
  CreateEmpolyeeDto,
  CreateEmpolyeeSkillDto,
  UpdateEmpolyeeDto,
  UpdateEmpolyeeSkillDto,
} from "../dtos";
import { EmpolyeeEntity, EmpolyeeSkillEntity } from "../entities";
import { PageOptionsDto, PageDto, PageMetaDto } from "../../../common/dtos";

@Injectable()
export class EmpolyeeService {
  constructor(
    @InjectRepository(EmpolyeeEntity)
    private empolyeeRepository: Repository<EmpolyeeEntity>,

    @InjectRepository(EmpolyeeSkillEntity)
    private empolyeeSkillRepo: Repository<EmpolyeeSkillEntity>
  ) {}

  async create(createEmpolyeeDto: CreateEmpolyeeDto): Promise<EmpolyeeEntity> {
    const user = await this.empolyeeRepository.findOne({
      where: { officialMail: createEmpolyeeDto.officialMail },
    });

    if (user != null) {
      throw new HttpException("email already exists", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createEmpolyeeDto.password, 10);
    const empolyee = this.empolyeeRepository.create({
      ...createEmpolyeeDto,
      password: hashedPassword,
    });

    await this.empolyeeRepository.save(empolyee);

    return empolyee;
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,

    query: string
  ): Promise<PageDto<CreateEmpolyeeDto>> {
    const queryBuilder =
      this.empolyeeRepository.createQueryBuilder("employees");
    queryBuilder

      .orderBy("employees.created_at", pageOptionsDto.order)

      .skip(pageOptionsDto.skip)

      .take(pageOptionsDto.take);

    if (pageOptionsDto.search) {
      queryBuilder.where("employees.name LIKE :search", {
        search: `%${query.search}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<EmpolyeeEntity> {
    const data = await this.empolyeeRepository
      .createQueryBuilder("employees")
      .where("employees .id = :id", { id })
      .leftJoinAndSelect("employees.address", "address")
      .execute();

    if (data.length === 0)
      throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);

    return data;
  }

  async update(
    id: number,
    updateEmpolyeeDto: UpdateEmpolyeeDto
  ): Promise<UpdateResult> {
    await this.findOne(id);

    return await this.empolyeeRepository
      .createQueryBuilder("employees")
      .update(EmpolyeeEntity)
      .set({
        name: updateEmpolyeeDto.name,
        dateOfBirth: updateEmpolyeeDto.dateOfBirth,
        dateOfLeave: updateEmpolyeeDto.dateOfLeave,
        dateOfJoin: updateEmpolyeeDto.dateOfJoin,
        gender: updateEmpolyeeDto.gender,
        mobileNo: updateEmpolyeeDto.mobileNo,
        alternateMobileNo: updateEmpolyeeDto.alternateMobileNo,
        reportingManagerId: updateEmpolyeeDto.reportingManagerId,
        address: updateEmpolyeeDto.address,
      })
      .where("employees.id = :id", { id })
      .execute();
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);

    const data = await this.empolyeeRepository
      .createQueryBuilder("employees")
      .delete()
      .from(EmpolyeeEntity)
      .where("id = :id", { id: id })
      .execute();
    return data;
  }

  async createSkill(
    empolyeeSkillDto: CreateEmpolyeeSkillDto
  ): Promise<EmpolyeeSkillEntity> {
    console.log(empolyeeSkillDto);
    const empolyee = new EmpolyeeSkillEntity();
    empolyee.name = empolyeeSkillDto.name;

    await this.empolyeeSkillRepo.save(empolyee);

    return empolyee;
  }

  async findOneSkill(id: number) {
    const data = await this.empolyeeSkillRepo
      .createQueryBuilder("empolyee_skills")
      .where("empolyee_skills.id = :id", { id })
      .execute();

    if (data.length === 0)
      throw new HttpException(`Invalid Id`, HttpStatus.BAD_REQUEST);

    return data;
  }

  async removeSkill(id: number): Promise<DeleteResult> {
    await this.findOneSkill(id);

    const data = await this.empolyeeRepository
      .createQueryBuilder("empolyee_skills")
      .delete()
      .from(EmpolyeeSkillEntity)
      .where("id = :id", { id: id })
      .execute();
    return data;
  }

  async updateSkill(
    id: number,
    updateEmpolyeeDto: UpdateEmpolyeeSkillDto
  ): Promise<UpdateResult> {
    await this.findOneSkill(id);

    return await this.empolyeeSkillRepo
      .createQueryBuilder("empolyee_skills")
      .update()
      .set({ name: updateEmpolyeeDto.name })
      .where("empolyee_skills.id = :id", { id })
      .execute();
  }

  async findAllSkills(
    pageOptionsDto: PageOptionsDto,

    query: string
  ): Promise<PageDto<EmpolyeeSkillEntity>> {
    const queryBuilder =
      this.empolyeeSkillRepo.createQueryBuilder("empolyee_skills");
    queryBuilder

      .orderBy("empolyee_skills.created_at", pageOptionsDto.order)

      .skip(pageOptionsDto.skip)

      .take(pageOptionsDto.take);

    if (pageOptionsDto.search) {
      queryBuilder.where("empolyee_skills.name LIKE :search", {
        search: `%${query.search}%`,
      });
    }

    const itemCount = await queryBuilder.getCount();

    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
