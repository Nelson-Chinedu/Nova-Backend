import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProfileModule } from './modules/profile/profile.module';
import { TimeOffRequestsModule } from './modules/time-off-request/time-off-request.module';
import { RecruitmentModule } from './modules/recruitment/recruitment.module';
import { CandidateModule } from './modules/candidate/candidate.module';

import { config } from '../ormconfig';

import { AuthGuard } from './common/guards/auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    ProfileModule,
    AuthModule,
    EmployeeModule,
    TimeOffRequestsModule,
    RecruitmentModule,
    CandidateModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
