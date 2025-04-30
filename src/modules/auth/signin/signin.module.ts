import { Module } from '@nestjs/common';
import { SigninService } from './signin.service';
import { SigninController } from './signin.controller';
import Account from '../signup/entities/signup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService, TokenService } from 'src/common/service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [SigninController],
  providers: [SigninService, MailService, TokenService],
})
export class SigninModule {}
