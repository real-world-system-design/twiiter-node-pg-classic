import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('/@:username')
  getUserByUsername(@Param('username') username: string): string {
    return `details of username ${username}`;
  }

  @Get('/:userid')
  getUserById(@Param('userid') userid: string): string {
    return `user by id ${userid}`;
  }

  @Post('/')
  createNewUser(): string {
    return 'new user created';
  }

  @Patch('/:userid')
  updateUserDetails(@Param('userid') userid: string) {
    return `initiate a update request for user ${userid}`;
  }

  @Delete('/:userid')
  delteUserById(@Param('userid') userid: string) {
    return `initiate a delete request for user ${userid}`;
  }
}
