import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';

import Candidate from './entities/candiidate.entity';
import Account from '../auth/entities/account.entity';
import Recruitment from '../recruitment/entities/recruitment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate, Account, Recruitment])],
  controllers: [CandidateController],
  providers: [CandidateService],
})
export class CandidateModule {}
