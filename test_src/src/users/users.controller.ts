import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';

class UserCreateRequestBody {
   @ApiProperty() email: string
   @ApiProperty() username: string
   @ApiProperty() bio: string
}

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    @HttpCode(201)
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }

    @Post('/register')
    @HttpCode(201)
    async registerUser(@Body() data: UserCreateRequestBody): Promise<UserEntity> {
        const user = await this.userService.registerUser(data);
        return user;
    }
}
