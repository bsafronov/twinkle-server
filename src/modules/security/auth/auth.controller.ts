import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/security/guards/jwtAuthGuard';
import { CreateUserDTO } from '../../user/dto/createUserDto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/loginUserDto';
import { AuthUserResponse } from './response/authUserResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201, type: CreateUserDTO })
  @Post('/registration')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registration(dto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('/login')
  login(@Body() dto: LoginUserDTO) {
    if (dto.login.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i)) {
      return this.authService.loginViaEmail(dto);
    }

    return this.authService.loginViaUsername(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  check() {
    return true;
  }
}
