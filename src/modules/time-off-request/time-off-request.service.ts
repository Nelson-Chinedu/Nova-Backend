import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import TimeOffRequests from '../time-off-request/entities/time-off-requests.entity';
import Account from '../auth/entities/account.entity';

@Injectable()
export class TimeOffRequestsService {
  constructor(
    @InjectRepository(TimeOffRequests)
    private timeOffRequestsRepository: Repository<TimeOffRequests>,

    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}
  async createTimeOff(payload: {
    userId: string | undefined;
    leaveType: string;
    leaveFrom: string;
    leaveTo: string;
  }) {
    const { leaveType, leaveFrom, leaveTo, userId } = payload;
    try {
      const user = await this.accountRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const result = this.timeOffRequestsRepository.create({
        leaveType,
        leaveFrom,
        leaveTo,
        account: user,
      });
      await this.timeOffRequestsRepository.save(result);
      return {
        message: 'Request time off created successfully',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
