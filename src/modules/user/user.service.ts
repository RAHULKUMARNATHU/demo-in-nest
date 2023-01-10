import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(
    createUserDto: CreateUserDto,
    hashedPassword: string
  ): Promise<User> {
    const user = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.repo.save(user);
  }

  findOne(id: number): Promise<User> {
    return this.repo.findOne({ id });
  }

  findByUserName(userName: string): Promise<User> {
    return this.repo.findOne({ userName });
  }

  findAll(userName: string): Promise<User[]> {
    return this.repo.find({ userName });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("Enter a valid User");
    }
    this.repo.merge(user, updateUserDto);

    return this.repo.save(user);
  }

  async updatePassword(id: number, data: any) {
   return this.repo.createQueryBuilder()
    .update(User)
    .set({password:data})
    .where("id = :id", { id: id })
    .execute();
  }
}


