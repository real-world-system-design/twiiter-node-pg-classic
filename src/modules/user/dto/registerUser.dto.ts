import { IsNotEmpty } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly name?: string;

  @IsNotEmpty()
  readonly avatar?: string;

  @IsNotEmpty()
  readonly bio?: string;
}
