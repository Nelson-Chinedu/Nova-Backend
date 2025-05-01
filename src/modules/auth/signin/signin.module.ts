import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SigninService } from './signin.service';

import { SigninController } from './signin.controller';

import Account from '../signup/entities/signup.entity';

import { MailService, TokenService } from '../../../common/service';

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
  controllers: [SigninController],
  providers: [SigninService, MailService, TokenService],
})
export class SigninModule {}
