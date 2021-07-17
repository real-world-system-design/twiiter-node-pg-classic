import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { SessionsEntity } from '../../entities/session.entity';
import { Repository } from 'typeorm';
import { PasswordEntity } from '../../entities/password.entity';
import { UsersRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UsersRepository,
    @InjectRepository(PasswordEntity)
    private readonly passwordRepo: Repository<PasswordEntity>,
    @InjectRepository(SessionsEntity)
    private readonly sessionRepo: Repository<SessionsEntity>,
  ) {}

  public static PASSWORD_SALT_ROUNDS = 10;

  async createPasswordForNewUser(
    userId: string,
    password: string,
  ): Promise<PasswordEntity> {
    const existing = await this.passwordRepo.findOne({ where: { userId } });
    if (existing)
      throw new HttpException(
        `sorry! password for ${userId} exists`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    const newPassword = new PasswordEntity();
    newPassword.userId = userId;
    newPassword.password = await this.passToHash(password);
    return await this.passwordRepo.save(newPassword);
  }

  async createNewSession(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Username does not exist');
    }
    const userPassword = await this.passwordRepo.findOne({
      where: { userId: user.id },
    });
    const passMatch = await this.matchPassHash(password, userPassword.password);
    if (!passMatch) {
      throw new UnauthorizedException('Password is wrong');
    }
    const session = new SessionsEntity();
    session.userId = userPassword.userId;
    const savedSession = await this.sessionRepo.save(session);
    return savedSession;
  }

  private async passToHash(password: string): Promise<string> {
    return hash(password, AuthService.PASSWORD_SALT_ROUNDS);
  }

  private async matchPassHash(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return (await compare(password, hash)) === true;
  }
}
