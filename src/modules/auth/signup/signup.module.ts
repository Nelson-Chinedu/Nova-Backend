import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { SignupService } from './signup.service';

import { SignupController } from './signup.controller';

import {
  MailService,
  TokenService,
  HashPasswordService,
} from '../../../common/service';

@Module({
  imports: [
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
  controllers: [SignupController],
  providers: [SignupService, MailService, TokenService, HashPasswordService],
})
export class SignupModule {}
