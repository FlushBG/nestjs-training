import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private repository: UsersRepository,
  ) {}

  async signUp(credentials: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(credentials);
  }

  async signIn(credentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = credentials;
    const user = await this.repository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      return 'success';
    }

    throw new UnauthorizedException('Invalid login credentials!');
  }
}
