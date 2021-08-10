import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload, JwtResponse } from './jwt/jwt.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private repository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(credentials: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(credentials);
  }

  async signIn(credentials: AuthCredentialsDto): Promise<JwtResponse> {
    const { username, password } = credentials;
    const user = await this.repository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('Invalid login credentials!');
  }
}
