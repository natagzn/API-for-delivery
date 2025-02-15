import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import {RolesGuard} from "./roles.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService,  {
    provide: APP_GUARD,
    useClass: RolesGuard}
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
