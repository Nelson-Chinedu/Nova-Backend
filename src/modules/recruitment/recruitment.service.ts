import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import Recruitment from './entities/recruitment.entity';
import Account from '../auth/entities/account.entity';
import { IAddPayload } from './recruitment.controller';
import Candidate from '../candidate/entities/candiidate.entity';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private dataSource: DataSource,
  ) {}
  async create(payload: {
    userId: string | undefined;
    job_title: string;
    job_type: string;
    department: string;
    location: string;
    about_company: string;
    description: string;
    active_until: string;
  }) {
    const { userId, ...rest } = payload;
    try {
      const user = await this.accountRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const result = this.recruitmentRepository.create({
        account: { id: userId },
        ...rest,
      });

      await this.recruitmentRepository.save(result);

      return {
        message: 'Recruitment added successfully',
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new InternalServerErrorException('An error occurred');
    }
  }

  async getRecruitment(id: string) {
    try {
      const result = await this.dataSource
        .getRepository(Recruitment)
        .createQueryBuilder('recruitment')
        .select(['recruitment'])
        .where('recruitment.id = :id', { id })
        .getOne();

      if (!result) {
        throw new NotFoundException(`Recruitment with id ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async getRecruitments(page: number, limit: number, userId: string) {
    try {
      const [data, total] = await this.dataSource
        .getRepository(Recruitment)
        .createQueryBuilder('recruitment')
        .leftJoinAndSelect('recruitment.account', 'account')
        .select(['recruitment', 'account.id'])
        .where('account.id = :userId', { userId })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  async addCandidate({
    payload,
    params,
  }: {
    payload: IAddPayload;
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

  async getCandidates(page: number, limit: number, recruitmentId: string) {
    try {
      const [data, total] = await this.dataSource
        .getRepository(Candidate)
        .createQueryBuilder('candidate')
        .leftJoinAndSelect('candidate.recruitment', 'recruitment')
        .select(['candidate', 'recruitment.id'])
        .where('recruitment.id = :recruitmentId', { recruitmentId })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      return {
        data,
        total,
        page,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
