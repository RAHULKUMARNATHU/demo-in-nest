import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmpolyeeEntity } from "../../empolyee/entities";
import { JwtService } from "@nestjs/jwt";
import { EmpolyeeService } from "../../empolyee/services/empolyee.service";
import { Repository, UpdateResult } from "typeorm";
import { AdminEntity } from "../entities/admins.entity";
import { RegisterAdminDto } from "../dtos/admin-sign-up.dto";
import EmailService from "../../utils/EmailService/email.service";
import { LoginDto } from "../dtos/login-user.dto";
import * as bcrypt from "bcrypt";
import { SystemAdminDto } from "../dtos/system-admin.dto";
import { SystemAdminEntity } from "../entities/systemAdmin.entity";

@Injectable()
export class SystemAdminService {
  constructor(
    @InjectRepository(EmpolyeeEntity)
    private readonly employeeRepository: Repository<EmpolyeeEntity>,
    @InjectRepository(SystemAdminEntity)
    private readonly systemAdminRepository: Repository<SystemAdminDto>,
    private readonly employeeService: EmpolyeeService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  //Admin Authentication
  async systemAdminSignUp(systemAdminDto: SystemAdminDto): Promise<void> {
    const isEmailRegistered = await this.systemAdminRepository.findOne(
      systemAdminDto.email
    );
    if (isEmailRegistered)
      throw new HttpException(
        "Email already registered",
        HttpStatus.BAD_REQUEST
      );
    systemAdminDto.password = await bcrypt.hash(systemAdminDto.password, 10);
    const admin = this.systemAdminRepository.create(systemAdminDto);
    await this.systemAdminRepository.save(admin);
  }

  public async loginSystemAdmin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const emp = await this.systemAdminRepository.findOne({
      where: { email },
    });
    if (!emp) throw new HttpException(` not found`, HttpStatus.BAD_GATEWAY);
    const isMatched = await bcrypt.compare(password, emp.password);
    if (!isMatched)
      throw new HttpException(`passwords do not match`, HttpStatus.BAD_REQUEST);
    const payload = {
      systemAdminId: emp.systemAdminId,
      role: emp.role,
      email: emp.email,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: "password",
      expiresIn: "43200s",
    });
    const data = this.jwtService.decode(access_token);
    return { access_token };
  }
}
