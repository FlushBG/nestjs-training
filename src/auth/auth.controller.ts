import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtResponse } from './jwt/jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() credentials: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(credentials);
  }

  @Post('/signin')
  signIn(@Body() credentials: AuthCredentialsDto): Promise<JwtResponse> {
    return this.authService.signIn(credentials);
  }
}
