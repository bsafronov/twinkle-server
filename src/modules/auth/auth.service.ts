import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiError } from 'src/common/errors/errors';
import { CreateUserDTO } from '../users/dto/createUserDto';
import { UsersService } from '../users/users.service';
import { LoginUserDTO } from './dto/loginUserDto';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from './response/authUserResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(dto: CreateUserDTO): Promise<CreateUserDTO> {
    let existUser = await this.usersService.findByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(ApiError.EMAIL_EXIST);
    }

    existUser = await this.usersService.findByUsername(dto.username);

    if (existUser) {
      throw new BadRequestException(ApiError.USERNAME_EXIST);
    }

    return this.usersService.createUser(dto);
  }

  async loginViaUsername(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.usersService.findByUsername(dto.login);

    if (!existUser) {
      throw new BadRequestException(ApiError.USERNAME_NOT_EXIST);
    }

    const isPassValidated = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!isPassValidated) {
      throw new BadRequestException(ApiError.WRONG_PASSWORD);
    }

    delete existUser.password;
    const token = await this.tokenService.generateJwtToken(existUser);

    return { token };
  }

  async loginViaEmail(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.usersService.findByEmail(dto.login);

    if (!existUser) {
      throw new BadRequestException(ApiError.EMAIL_NOT_EXIST);
    }

    const isPassValidated = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!isPassValidated) {
      throw new BadRequestException(ApiError.WRONG_PASSWORD);
    }

    delete existUser.password;
    const token = await this.tokenService.generateJwtToken(existUser);

    return { token };
  }
}
