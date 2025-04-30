import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './auth/signup/signup.module';

import { config } from '../ormconfig';

import { ProfileModule } from './profile/profile.module';
import { SigninModule } from './auth/signin/signin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    SignupModule,
    ProfileModule,
    SigninModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
