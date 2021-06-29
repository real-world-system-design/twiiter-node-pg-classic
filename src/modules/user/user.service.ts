import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { createUserDto } from './dto/registerUser.dto';
import { getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async registerUser(data: createUserDto): Promise<User> {
    const { username, password, email } = data;
    //save the user to the db
    const newUSer = new User();
    newUSer.username = username;
    newUSer.email = email;
    newUSer.password = password;
    const savedUser = await this.userRepo.save(newUSer);
    return savedUser;
  }
}
