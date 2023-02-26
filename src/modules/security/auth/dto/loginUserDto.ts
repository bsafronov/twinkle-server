import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({ description: 'Логин или почта' })
  @IsNotEmpty({ message: 'Введите почту или логин' })
  @IsString({ message: 'Логин или почта должна быть строкой' })
  login: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Введите пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
