import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import Recruitment from './entities/recruitment.entity';
import Account from '../auth/entities/account.entity';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
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
}
