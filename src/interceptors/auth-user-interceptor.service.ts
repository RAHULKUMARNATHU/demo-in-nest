import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log('Intercepto Injected >>>', )
    return next.handle();
  }
  
}
