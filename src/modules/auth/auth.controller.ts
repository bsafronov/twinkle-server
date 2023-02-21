import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/createUserDto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/loginUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registration(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginUserDTO) {
    if (dto.login.match(/@/)) {
      return this.authService.loginViaEmail(dto);
    }

    return this.authService.loginViaUsername(dto);
  }
}
