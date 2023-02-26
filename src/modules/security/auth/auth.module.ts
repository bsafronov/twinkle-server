import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/modules/security/strategy';
import { TokenModule } from '../token/token.module';
import { UsersModule } from '../../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
