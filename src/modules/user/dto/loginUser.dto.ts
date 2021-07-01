import { IsNotEmpty } from 'class-validator';

export class LoginData {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}