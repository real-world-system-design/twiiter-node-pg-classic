import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';

export class MockUsersRepository extends Repository<User> {
  async findOne() {
    return new User();
  }
}
