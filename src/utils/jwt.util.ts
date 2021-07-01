import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
const JWT_SECRET = 'this-is-a-very-secret';

export async function sign(user: User): Promise<string> {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
        email: user.email,
        exp: exp.getTime() / 1000,
      },
      JWT_SECRET,
      (err: any, token: string) => {
        if (err) throw reject(err);
        return resolve(token);
      },
    );
  });
}

export async function decode(token: string): Promise<User> {
  return new Promise<User>((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) throw reject(err);
      return resolve(decoded as User);
    });
  });
}