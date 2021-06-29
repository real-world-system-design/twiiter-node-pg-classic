import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { createUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/@:username')
  getUserByUsername(@Param('username') username: string): string {
    return `details of username ${username}`;
  }

  @Get('/:userid')
  getUserById(@Param('userid') userid: string): string {
    return `user by id ${userid}`;
  }

  @Post('/register')
  @HttpCode(201)
  async registerNewUser(@Body() data: createUserDto): Promise<User> {
    return await this.userService.registerUser(data);
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
