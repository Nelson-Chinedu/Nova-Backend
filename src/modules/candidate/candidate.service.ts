import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { IPayload } from './candidate.controller';
import { InjectRepository } from '@nestjs/typeorm';

import Account from '../auth/entities/account.entity';
import Recruitment from '../recruitment/entities/recruitment.entity';
import Candidate from '../candidate/entities/candiidate.entity';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}
  async create({
    payload,
    params,
  }: {
    payload: IPayload;
    params: { userId: string | undefined; recruitmentId: string | undefined };
  }) {
    const { userId, recruitmentId } = params;
    try {
      const user = await this.accountRepository.findOneBy({
        id: userId,
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      const recruitment = await this.recruitmentRepository.findOneBy({
        id: recruitmentId,
      });

      if (!recruitment) {
        throw new NotFoundException('Recruitment not found');
      }

      const result = this.candidateRepository.create({
        ...payload,
        recruitment: { id: recruitmentId },
      });
      await this.candidateRepository.save(result);

      return {
        message: 'Candidate added successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new InternalServerErrorException('An error occurred');
    }
  }
}
