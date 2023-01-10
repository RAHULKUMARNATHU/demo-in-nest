import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const curentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.customer;
  }
);
