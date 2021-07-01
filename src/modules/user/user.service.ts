import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { createUserDto } from './dto/registerUser.dto';
import { Repository } from 'typeorm';
import { hashPass, passMatch } from '../../utils/password';
import { sanitization } from '../../utils/security';
import { validate } from 'class-validator';
import { sign } from '../../utils/jwt.util';
import { LoginData } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async registerUser(data: createUserDto): Promise<User> {
    const { username, password, email } = data;

    //validate the user entered data
    const existingEmail = await this.userRepo.findOne({ email: email });
    const existingUser = await this.userRepo.findOne({ username: username });
    if (existingEmail && existingUser)
      throw new HttpException(
        {
          message: `Input data validation failed ${username} and ${email} must be unique`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    //save the user to the db
    const newUSer = new User();
    newUSer.username = username;
    newUSer.email = email;
    newUSer.password = await hashPass(password);

    const errors = await validate(newUSer);
    if (errors.length > 0) {
      const _errors = { username: 'UserInput is not valid' };
      throw new HttpException(
        { message: `Input data validation failed`, _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.userRepo.save(newUSer);
      return sanitization(savedUser);
    }
  }
  async loginUser(data: LoginData): Promise<User> {
    const { email, password } = data;
    const user = await this.userRepo.findOne({ email: email });
    if (!user)
      throw new HttpException(
        { message: `${email} not found` },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const matchPass = await passMatch(password, user.password);
    if (!matchPass)
      throw new HttpException(
        { message: 'wrong password' },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    user.token = await sign(user);
    return sanitization(user);
  }
}
