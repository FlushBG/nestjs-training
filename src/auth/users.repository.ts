import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/auth/entity/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

const DUPLICATE_KEY_ERROR_CODE = '23505';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(credentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = credentials;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = this.create({ username, passwordHash });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === DUPLICATE_KEY_ERROR_CODE) {
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
