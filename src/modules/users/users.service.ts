import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationError } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUserDto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ApiError } from 'src/common/errors/errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user) return user;

    return null;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) return user;

    return null;
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({
      ...dto,
      password: hashPassword,
    });
    this.usersRepository.save(user);

    return user;
  }
}
