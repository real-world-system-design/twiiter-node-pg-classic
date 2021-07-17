import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { hashPass } from '../../utils/password';
import { sanitization } from '../../utils/security';
import { validate } from 'class-validator';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private authService: AuthService,
  ) {}
  async registerUser(user: Partial<User>, password: string): Promise<User> {
    const existingEmail = await this.userRepo.findOne({ email: user.email });
    const existingUser = await this.userRepo.findOne({
      username: user.username,
    });
    if (existingEmail && existingUser)
      throw new HttpException(
        {
          message: `Input data validation failed ${user.username} and ${user.email} must be unique`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const errors = await validate(user);
    if (errors.length > 0) {
      const _errors = { username: 'UserInput is not valid' };
      throw new HttpException(
        { message: `Input data validation failed`, _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newUser = await this.userRepo.save(user);

      await this.authService.createPasswordForNewUser(
        newUser.id,
        await hashPass(password),
      );

      return sanitization(newUser);
    }
  }
}
