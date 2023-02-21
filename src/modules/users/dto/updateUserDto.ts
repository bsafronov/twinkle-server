import { IsOptional } from 'class-validator';
import { CreateUserDTO } from './createUserDto';

export class UpdateUserDTO extends CreateUserDTO {
  @IsOptional()
  email: string;

  @IsOptional()
  username: string;

  @IsOptional()
  password: string;
}
