import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordEntity } from '../../entities/password.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PasswordEntity)
    private readonly passwordRepo: Repository<PasswordEntity>,
  ) {}

  async createPasswordForNewUser(
    userId: string,
    password: string,
  ): Promise<PasswordEntity> {
    const existing = await this.passwordRepo.findOne({ where: { userId } });
    if (existing)
      throw new HttpException(
        `user with this ${userId} exists`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const newPassword = new PasswordEntity();
    newPassword.userId = userId;
    newPassword.password = password;
    return await this.passwordRepo.save(newPassword);
  }
}
