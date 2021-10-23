import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';

import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '30s'},
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService,LocalStrategy,JwtStrategy],
    exports: [AuthService],
})
export class AuthModule { }
