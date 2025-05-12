import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecruitmentService } from './recruitment.service';
import { RecruitmentController } from './recruitment.controller';

import Recruitment from './entities/recruitment.entity';
import Account from '../auth/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruitment, Account])],
  controllers: [RecruitmentController],
  providers: [RecruitmentService],
})
export class RecruitmentModule {}
