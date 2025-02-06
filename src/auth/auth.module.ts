import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import {UserService} from '../user/user.service';
import { LocalStrategy } from './local.strategy';
import {PassportModule} from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';



@Module({
  imports: [
      UserModule, PassportModule,
    /*JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })*/
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
