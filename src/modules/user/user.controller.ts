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
import { LoginData } from './dto/loginUser.dto';
import { createUserDto } from './dto/registerUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
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

  @Post('login')
  @HttpCode(201)
  async loginUser(@Body() data: LoginData): Promise<User> {
    return await this.userService.loginUser(data);
  }

  @Patch('/:userid')
  @HttpCode(201)
  async updateUserDetails(
    @Body() data: updateUserDto,
    @Param('userid') userid: string,
  ) {
    return await this.userService.updateUser(data, userid);
  }

  @Delete('/:userid')
  @HttpCode(201)
  async delteUserById(@Param('userid') userid: string): Promise<void> {
    await this.userService.deleteUser(userid);
  }
}
