import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/common/config';
import { AuthUserResponse } from '../auth/response/authUserResponse';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user) {
    const payload = { user };

    return this.jwtService.sign(payload, {
      expiresIn: config.TOKEN.EXPIRES_IN,
      secret: config.TOKEN.SECRET_KEY,
    });
  }
}
