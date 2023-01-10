import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request && request.headers.authorization) {
      request.customer = await this.validateToken(request.headers.authorization);
      return true
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    
  }

  async validateToken(auth: string): Promise<any> {
    const token = auth.replace(/Bearer/gi, '').trim();
    try {
      const payload: any  = jwt.decode(token);
      console.log('Decoded Payload >>>>', payload);
      return  payload;
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
