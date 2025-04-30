import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SignupModule } from './modules/auth/signup/signup.module';
import { SigninModule } from './modules/auth/signin/signin.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { ProfileModule } from './modules/profile/profile.module';

import { config } from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    SignupModule,
    ProfileModule,
    SigninModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
