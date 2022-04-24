import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(private userRepo: UserRepository) {}

    async getAllUsers(): Promise<UserEntity[]> {
        const allUsers = await this.userRepo.find();
        return allUsers; 
    }

    async registerUser(user: Partial<UserEntity>): Promise<UserEntity> {
        const foundUser = await this.userRepo.findOne({where: {id: user.id}});
        const existingUser = await this.userRepo.findOne({where: {id: user.id}});

        if (existingUser && foundUser) {
            throw new HttpException(
                {
                    message: `Input data validation failed`,
                },
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const errors = await validate(user);
        if (errors.length > 0) {
            console.log("got some error");
        }

        const newUser = await this.userRepo.save(user);
        return newUser;
    }

}
