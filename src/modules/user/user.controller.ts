import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UserPD } from '../auth/auth.decorator';
import { RequiredAuthGuard } from '../auth/auth.guard';
import { LoginData } from './dto/loginUser.dto';
import { createUserDto } from './dto/registerUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/@:username')
  @HttpCode(201)
  getUserByUsername(@Param('username') username: string): string {
    return `details of username ${username}`;
  }

  @Get('/:userid')
  @HttpCode(201)
  getUserById(@Param('userid') userid: string): string {
    return `user by id ${userid}`;
  }

  @Post('/register')
  @HttpCode(201)
  async registerNewUser(@Body() data: createUserDto): Promise<User> {
    const user = await this.userService.registerUser(data, data.password);
    return user;
  }

  @Post('login')
  @HttpCode(201)
  async loginUser(@Body() data: LoginData) {
    //:TODO: user login logic
  }

  @UseGuards(RequiredAuthGuard)
  @Patch('/:userid')
  @HttpCode(201)
  async updateUserDetails(
    @UserPD() authdUser: User,
    @Body() data: updateUserDto,
    @Param('userid') userid: string,
  ) {
    if (authdUser.id !== userid) {
      throw new ForbiddenException('you can only update your own details');
    }
    return await this.userService.updateUser(userid, data);
  }

  @Delete('/:userid')
  @HttpCode(201)
  async delteUserById(@Param('userid') userid: string): Promise<void> {
    //TODO: delete user
  }
}
