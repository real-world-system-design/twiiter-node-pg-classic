import { User } from '../entities/user.entity';

export function sanitization(user: User) {
  //:TODO: need triger password sanitization
  if (user.userPassword) delete user.userPassword;
  return user;
}
