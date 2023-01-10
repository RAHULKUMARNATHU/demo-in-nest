import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UseGuards,
  Request,
  Res,
  HttpStatus,
} from "@nestjs/common";

import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { AuthService } from "./auth.service";
import { Serialize, UserInterceptor } from "src/interceptors/user-interceptor";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { response, Response } from "express";
import { ResetPasswordDto } from "./dto/reset-password-dto";

@Controller("auth")
@Serialize(UserDto)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
  ) {}

  @Post("/signup")
  async createUser(
    @Res() res: Response,
    @Body() body: CreateUserDto
  ): Promise<void> {
    const data = await this.authService.signup(body);

    res.status(HttpStatus.CREATED).send({
      success: HttpStatus.CREATED,
      data,
      message: "User Created Successfully",
    });
  }

  @Post("/login")
  async login(@Res() res: Response, @Body() body: LoginUserDto): Promise<void> {
    const data = await this.authService.login(body.userName, body.password);
    res.status(HttpStatus.OK).send({
      success: HttpStatus.OK,
      data,
      message: "Successfully login ",
    });
  }

  // @UseInterceptors(new UserInterceptor(UserDto))
  @Get(":id")
  async findOne(@Res() res: Response, @Param("id") id: number): Promise<void> {
    const data = await this.userService.findOne(+id);

    res.status(HttpStatus.OK).send({
      success: HttpStatus.OK,
      data,
    });
  }

  // @UseInterceptors(new UserInterceptor(UserDto))
  @Get("getAll/:userName")
  find(@Param("userName") userName: string): Promise<User[]> {
    return this.userService.findAll(userName);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/changePassword")
  async ChangePassword(
    @Request() req,
    @Res() res: Response,
    @Body() resetPasswordDto: ResetPasswordDto
  ) {



    
    const data = await this.authService.resetPassword(
      req.user.userId,
      resetPasswordDto
    );
    res.status(HttpStatus.OK).send({
      success: HttpStatus.OK,
      data,
      message: "Password reset successfully",
    });
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<void> {
    const data = await this.userService.update(+id, updateUserDto);
    res.status(HttpStatus.OK).send({
      success: HttpStatus.OK,
      message: "User Updated Successfully",
      data,
    });
  }
}
