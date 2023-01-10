import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { LoginDto } from "../dtos/login-user.dto";
import { OrganizationEntity } from "src/modules/organization/entities";

@Injectable()
export class OrganizationAuthService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
    private jwtService: JwtService
  ) {}

  public async loginOrganization(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const organization = await this.organizationRepository.findOne({
      where: { email },
    });
    if (!organization)
      throw new HttpException(`not found `, HttpStatus.BAD_REQUEST);
    const isMatched = await bcrypt.compare(password, organization.password);
    // const isMatched = password === organization.password;
    if (!isMatched)
      throw new HttpException(`passwords do not match`, HttpStatus.BAD_REQUEST);
    const payload = {
      id: organization.id,
      role: organization.role,
      email: organization.email,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: "password",
      expiresIn: "43200s",
    });
    const data = this.jwtService.decode(access_token);
    return { access_token };
  }
}
