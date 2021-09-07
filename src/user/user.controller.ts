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
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserPD } from '../auth/auth.decorator';
import { RequiredAuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger';

class UserCreateRequestBody {
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiPropertyOptional() email: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

class UserUpdateRequestBody {
  @ApiPropertyOptional() password?: string;
  @ApiPropertyOptional() name?: string;
  @ApiPropertyOptional() avatar?: string;
  @ApiPropertyOptional() bio?: string;
}

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('/@:username')
  @HttpCode(201)
  getUserByUsername(@Param('username') username: string): string {
    return `details of username ${username}`;
  }

  @Get('/:userid')
  @HttpCode(201)
  async getUserById(@Param('userid') userid: string): Promise<User> {
    return await this.userService.getUserById(userid);
  }

  @Post('/register')
  @HttpCode(201)
  async registerNewUser(@Body() data: UserCreateRequestBody): Promise<User> {
    const user = await this.userService.registerUser(data, data.password);
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Patch('/:userid')
  @HttpCode(201)
  async updateUserDetails(
    @UserPD() authdUser: User,
    @Body() data: UserUpdateRequestBody,
    @Param('userid') userid: string,
  ) {
    if (authdUser.id !== userid) {
      throw new ForbiddenException('you can only update your own details');
    }
    return await this.userService.updateUser(userid, data);
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Put('/:userid/follow')
  @HttpCode(201)
  async followUser(
    @UserPD() follower: User,
    @Param('userid') followeeId: string,
  ): Promise<User> {
    const followedUser = await this.userService.createUserFollowerRelation(
      follower,
      followeeId,
    );
    return followedUser;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:userid/follow')
  async unfollowUser(
    @UserPD() follower: User,
    @Param('userid') followeeId: string,
  ): Promise<User> {
    const unfollowedUser = await this.userService.deleteFollowRelation(
      follower,
      followeeId,
    );
    return unfollowedUser;
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:userid/followers')
  async getFollowersOfUser(): Promise<User[]> {
    return [];
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Get('/:userid/followees')
  async getFolloweesOfUser(): Promise<User[]> {
    return [];
  }

  @ApiBearerAuth()
  @UseGuards(RequiredAuthGuard)
  @Delete('/:userid')
  @HttpCode(201)
  async delteUserById(@Param('userid') userid: string): Promise<void> {
    return this.userService.deleteUser(userid);
  }
}
