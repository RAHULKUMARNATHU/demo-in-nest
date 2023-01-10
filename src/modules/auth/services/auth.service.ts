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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmpolyeeEntity)
    private readonly employeeRepository: Repository<EmpolyeeEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly employeeService: EmpolyeeService,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  //Admin Authentication
  async adminSignUp(registerAdminDto: RegisterAdminDto): Promise<void> {
    const isEmailRegistered = await this.adminRepository.findOne(
      registerAdminDto.email
    );
    if (isEmailRegistered)
      throw new HttpException(
        "Email already registered",
        HttpStatus.BAD_REQUEST
      );
    registerAdminDto.password = await bcrypt.hash(
      registerAdminDto.password,
      10
    );
    const admin = this.adminRepository.create(registerAdminDto);
    await this.adminRepository.save(admin);
  }
  //removie email verification,email service disable

  //mark email as confirmed

  // async markAdminEmailIsConfirmed(email: string): Promise<UpdateResult> {
  //   return await this.adminRepository.update(
  //     { email },
  //     { email_confirm: true }
  //   );
  // }

  //email send
  public async sendVerifiedEmail(email: string): Promise<void> {
    const payload = { email };
    const token = this.jwtService.sign(payload, {
      secret: "password",
      expiresIn: "300s",
    });
    const url = `http://localhost:3000/auth/confirm-email/${token}`;
    const text = `To confirm click:${url}`;
    await this.emailService.sendMail({
      to: email,
      subject: "Email Confirmation",
      text,
    });
  }

  //email confirm

  // async confirmEmail(email: string): Promise<void> {
  //   const admin = await this.adminRepository.findOne({ where: { email } });
  //   console.log(admin);
  //   if (admin.email_confirm)
  //     throw new HttpException(`Email already verified`, HttpStatus.BAD_REQUEST);
  //   await this.markAdminEmailIsConfirmed(email);
  // }

  public async sendConfirmEmail(admin: AdminEntity): Promise<void> {
    const { email, firstName, lastName } = admin;
    const text = `Heyy , Thank You for being a part our pizza family , ${firstName}  ${lastName}`;
    await this.emailService.sendMail({
      to: email,
      subject: "Your Registration is Successful",
      text,
    });
  }
  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: "password",
      });

      if (typeof payload === "object" && "email" in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === "TokenExpiredError") {
        throw new BadRequestException(
          "Your Email Confirmation Token Has been expired kindly request for and new Token through resend api"
        );
      }
      throw new BadRequestException("Incorrect confirmation token");
    }
  }
  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin)
      throw new HttpException("admin not found", HttpStatus.BAD_REQUEST);
    // if (admin && !admin.email_confirm)
    // throw new HttpException(
    //   "Please Verify your Email",
    //   HttpStatus.BAD_REQUEST
    // );
    const isMatched = await bcrypt.compare(password, admin.password);
    if (!isMatched)
      throw new HttpException("Invalid Credentials", HttpStatus.BAD_REQUEST);
    const payload = {
      adminId: admin.id,
      role: admin.role,
      email: admin.email,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: "password",
      expiresIn: "43200s",
    });
    const data = this.jwtService.decode(access_token);
    return { access_token };
  }

  //login
}
