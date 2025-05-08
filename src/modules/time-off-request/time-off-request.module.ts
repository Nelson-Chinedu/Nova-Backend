import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeOffRequestsService } from './time-off-request.service';

import { TimeoffRequestsController } from './time-off-request.controller';

import TimeOffRequests from './entities/time-off-requests.entity';
import Account from '../auth/entities/account.entity';
import Profile from '../profile/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeOffRequests, Account, Profile])],
  controllers: [TimeoffRequestsController],
  providers: [TimeOffRequestsService],
})
export class TimeOffRequestsModule {}
