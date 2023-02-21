import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUserDto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dto/updateUserDto';

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

  async updateUser(id: number, dto: UpdateUserDTO) {
    await this.usersRepository.update({ id }, dto);
    return dto;
  }

  async deleteUser(id: number) {
    await this.usersRepository.delete({ id });
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
