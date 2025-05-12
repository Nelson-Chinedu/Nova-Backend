import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Recruitment from './entities/recruitment.entity';
import Account from '../auth/entities/account.entity';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
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
}
