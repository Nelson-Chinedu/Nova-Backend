import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';

import Account from './entities/signup.entity';

import { MailService, TokenService } from 'src/common/service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [SignupController],
  providers: [SignupService, MailService, TokenService],
})
export class SignupModule {}
