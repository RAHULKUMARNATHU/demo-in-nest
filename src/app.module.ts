import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseConnectionService } from "./database/databse-connection.service";
import { DepartmentModule } from "./modules/department/department.module";
import { EmpolyeeModule } from "./modules/empolyee/empolyee.module";
import { OrganizationModule } from "./modules/organization/organization.module";
import { OrganizationSkillsModule } from "./modules/organization-skills/organization-skills.module";
import { ProductsModule } from './modules/products/products.module';
import { UserModule } from "./modules/user/user.module";
// import { AuthModules } from "./modules/user/auth.module";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    AuthModule,
    DepartmentModule,
    EmpolyeeModule,
    OrganizationModule,
    OrganizationSkillsModule,
    ProductsModule,
    UserModule,
    
   
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // },
    AppService,
    DepartmentModule,
    EmpolyeeModule,
  ],
})
export class AppModule {}
