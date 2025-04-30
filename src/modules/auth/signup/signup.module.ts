import { Module } from '@nestjs/common';

import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';

import {
  MailService,
  TokenService,
  HashPasswordService,
} from 'src/common/service';

@Module({
  controllers: [SignupController],
  providers: [SignupService, MailService, TokenService, HashPasswordService],
})
export class SignupModule {}
