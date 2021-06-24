import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/@:username')
  getUserByUsername(@Param() param): string {
    return `details of username ${param.username}`;
  }
}
