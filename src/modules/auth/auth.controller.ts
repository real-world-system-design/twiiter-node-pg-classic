import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

class LoginRequestBody {
  username: string;
  password: string;
}

class LoginResponseBody {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginRequestBody) {
    const session = await this.authService.createNewSession(
      body.username,
      body.password,
    );
    return new LoginResponseBody(session.id);
  }
}
