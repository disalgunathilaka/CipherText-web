import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getCurrentUser = createParamDecorator(
  (_data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user?._id;
  }
);
