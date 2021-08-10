import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
