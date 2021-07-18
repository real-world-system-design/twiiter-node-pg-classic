import { IsEmail, IsNotEmpty } from 'class-validator';

export class updateUserDto {
  @IsEmail()
  readonly email?: string;

  @IsNotEmpty()
  readonly username?: string;

  @IsNotEmpty()
  readonly password?: string;

  @IsNotEmpty()
  readonly avatar?: string;

  @IsNotEmpty()
  readonly bio?: string;
}
