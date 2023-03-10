import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/common/config';
import { TokenAuthDTO } from './dto/tokenAuthDto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(data: TokenAuthDTO) {
    const user: TokenAuthDTO = {
      id: data.id,
      email: data.email,
      username: data.username,
    };
    const payload = { user };

    return this.jwtService.sign(payload, {
      expiresIn: config.TOKEN.EXPIRES_IN,
      secret: config.TOKEN.SECRET_KEY,
    });
  }
}
