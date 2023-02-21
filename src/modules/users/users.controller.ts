import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwtAuthGuard';
import { TokenAuthDTO } from '../token/dto/tokenAuthDto';
import { UpdateUserDTO } from './dto/updateUserDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @ApiResponse({ type: UpdateUserDTO })
  @Patch()
  updateUser(@Body() dto: UpdateUserDTO, @Req() request) {
    const user: TokenAuthDTO = request.user;

    return this.userService.updateUser(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiTags('Users')
  @Delete()
  deleteUser(@Req() request) {
    const user: TokenAuthDTO = request.user;
    this.userService.deleteUser(user.id);
  }
}
