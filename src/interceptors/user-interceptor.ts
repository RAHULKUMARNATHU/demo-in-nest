import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
import { UserDto } from "src/modules/user/dto/user.dto";

interface ClassConstructor {
  new (...args: any[]): {};
}
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new UserInterceptor(dto));
}

export class UserInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      })
    );
  }
}
