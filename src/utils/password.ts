import * as bcrypt from 'bcrypt';
const salt_rounds = 10;

export async function hashPass(password: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, salt_rounds, (err, hashed) => {
      if (err) throw reject(err);
      return resolve(hashed);
    });
  });
}

export async function passMatch(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) throw reject(err);
      return resolve(result);
    });
  });
}
