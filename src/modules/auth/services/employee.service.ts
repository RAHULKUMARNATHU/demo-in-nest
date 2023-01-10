import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { LoginDto } from "../dtos/login-user.dto";
import { EmpolyeeEntity } from "../../empolyee/entities";

@Injectable()
export class employeeAuthService {
  constructor(
    @InjectRepository(EmpolyeeEntity)
    private readonly employeeRepository: Repository<EmpolyeeEntity>,
    private jwtService: JwtService
  ) {}

  public async loginEmp(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const officialMail = email;
    const emp = await this.employeeRepository.findOne({
      where: { officialMail },
    });
    if (!emp) throw new HttpException(`user not found`, HttpStatus.BAD_GATEWAY);
    const isMatched = await bcrypt.compare(password, emp.password);
    if (!isMatched)
      throw new HttpException(`passwords do not match`, HttpStatus.BAD_REQUEST);
    const payload = {
      empId: emp.id,
      role: emp.role,
      email: emp.officialMail,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: "password",
      expiresIn: "43200s",
    });
    const data = this.jwtService.decode(access_token);
    return { access_token };
  }
}
