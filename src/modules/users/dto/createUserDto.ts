import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const usernameMatch = /[a-z]{1,}[0-9]*/i;
const nameMatch = /^[a-zа-я]+$/i;

export class CreateUserDTO {
  @IsEmail({}, { message: 'Почта указана некорректно' })
  email: string;

  @IsNotEmpty({ message: 'Логин не может быть пустым' })
  @IsString({ message: 'Логин должен быть строкой' })
  @MinLength(3, { message: 'Логин не может быть меньше 3 символов' })
  @MaxLength(20, { message: 'Логин не может содержать больше 20 символов' })
  @Matches(usernameMatch, { message: 'Логин должен содержать латиницу' })
  username: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(5, { message: 'Пароль должен быть более 4 символов' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  @Matches(nameMatch, { message: 'Имя не может иметь цифр' })
  @MinLength(2, { message: 'Имя не может быть меньше 2 букв' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Фамилия не может содержать цифр' })
  @Matches(nameMatch, { message: 'Фамилия не может иметь цифр' })
  @MinLength(2, { message: 'Фамилия не может быть меньше 2 букв' })
  lastName?: string;
}
