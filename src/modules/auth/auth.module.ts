import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import Account from '../auth/entities/account.entity';

import {
  MailService,
  TokenService,
  HashPasswordService,
} from '../../common/service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('VERIFICATION_JWT_kEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') || '60s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, TokenService, HashPasswordService],
})
export class AuthModule {}
