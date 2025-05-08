import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import TimeOffRequests from '../time-off-request/entities/time-off-requests.entity';
import Account from '../auth/entities/account.entity';
import Profile from '../profile/entities/profile.entity';

@Injectable()
export class TimeOffRequestsService {
  constructor(
    @InjectRepository(TimeOffRequests)
    private timeOffRequestsRepository: Repository<TimeOffRequests>,

    @InjectRepository(Account) private accountRepository: Repository<Account>,

    @InjectRepository(Profile) private profileRepository: Repository<Profile>,

    private dataSource: DataSource,
  ) {}
  async createTimeOff(payload: {
    userId: string | undefined;
    leaveDays: number;
    leaveType: string;
    leaveFrom: string;
    leaveTo: string;
  }) {
    const { leaveType, leaveFrom, leaveTo, userId, leaveDays } = payload;
    try {
      const user = await this.accountRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const profile = await this.profileRepository.findOneBy({
        account: { id: userId },
      });

      if (!profile) {
        throw new NotFoundException('User not found');
      }

      const result = this.timeOffRequestsRepository.create({
        leaveType,
        leaveFrom,
        leaveTo,
        leaveDays,
        account: user,
        profile: { id: profile.id },
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

  /**
   *
   * @param {number} page -  page number for pagination
   * @param {number} limit - limit for number of items per page
   * @returns Promise<object[]>
   */
  async getTimeOffRequests(page: number, limit: number) {
    try {
      const [data, total] = await this.dataSource
        .getRepository(TimeOffRequests)
        .createQueryBuilder('timeOffRequests')
        .leftJoinAndSelect('timeOffRequests.profile', 'profile')
        .select([
          'timeOffRequests.id',
          'timeOffRequests.leaveType',
          'timeOffRequests.leaveFrom',
          'timeOffRequests.leaveTo',
          'timeOffRequests.leaveDays',
          'profile.firstname',
          'profile.lastname',
        ])
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
