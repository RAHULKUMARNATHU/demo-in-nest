import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { scrypt as _scrypt } from "crypto";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { User } from "./entities/user.entity";
import { ResetPasswordDto } from "./dto/reset-password-dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const users = await this.userService.findByUserName(createUserDto.userName);
    if (users) {
      throw new BadRequestException("Sorry :)Already Email In Use ");
    }
    const saltOrRounds = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds
    );

    const user = await this.userService.create(createUserDto, hashPassword);
    return user;
  }

  async login(userName: string, password: string): Promise<object> {
    const user = await this.userService.findByUserName(userName);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    const hash = await bcrypt.compare(password, user.password);
    if (!hash) {
      throw new BadRequestException("Bad Password");
    }
    // return user;
    const payload = { username: user.userName, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async resetPassword(userId: number, body: ResetPasswordDto) {
   
   
    const user = await this.userService.findOne(userId);

    console.log("change Password >>><<<><><><><><>" , user);
    // if (!user) {
    //   throw new NotFoundException("Sorry ! Wrong User ");
    // }

    if (user) {
      const isMatch = await bcrypt.compare(body.old_password, user.password);
      if (isMatch) {
        const saltOrRounds = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(body.new_password, saltOrRounds);
        const updatePassword = await this.userService.updatePassword(user.id ,{password:hashPassword});
        if (updatePassword) {
          return true
        } else {
          throw new HttpException('Error While resetting password', HttpStatus.BAD_REQUEST)
        }
      }else {
        throw new HttpException('You Entered a wrong password', HttpStatus.BAD_REQUEST)
      }
    }
  }
}
