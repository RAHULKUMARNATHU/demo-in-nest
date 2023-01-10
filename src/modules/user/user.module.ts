import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { AuthService } from "./auth.service";
import { JwtModule} from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./auth/strategies/jwt-strategies";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),


],
  controllers: [UserController],
  providers: [UserService, AuthService , JwtStrategy],
 

})
export class UserModule {}
