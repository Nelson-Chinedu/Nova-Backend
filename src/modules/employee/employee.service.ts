import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { generate } from 'generate-password';

import { CreateEmployeeDto } from './dto/create-employee.dto';

import Account from '../auth/signup/entities/signup.entity';

import Profile from '../profile/entities/profile.entity';

import { HashPasswordService, MailService } from '../../common/service/';

@Injectable()
export class EmployeeService {
  constructor(
    private hashPassword: HashPasswordService,
    private dataSource: DataSource,
    private readonly mailService: MailService,
    private configService: ConfigService,
  ) {}
  async create(createEmployeeDto: CreateEmployeeDto) {
    const {
      firstname,
      lastname,
      email,
      contract_type,
      department,
      job_title,
      phone_number,
    } = createEmployeeDto;

    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const isEmailExist = await queryRunner.manager.exists(Account, {
        where: { email },
      });

      if (isEmailExist) {
        throw new ConflictException('Email address already exist');
      }

      const password = generate({
        length: 10,
        lowercase: true,
        numbers: true,
        uppercase: true,
      });

      const hashedPassword = await this.hashPassword.hash(password);

      const newAccount = queryRunner.manager.create(Account, {
        email,
        password: hashedPassword,
      });
      await queryRunner.manager.save(newAccount);

      const newProfile = queryRunner.manager.create(Profile, {
        firstname,
        lastname,
        contract_type,
        phone_number,
        department,
        job_title,
        account: newAccount,
      });

      await queryRunner.manager.save(newProfile);
      await queryRunner.commitTransaction();

      await this.mailService.sendMail({
        subject: `Welcome ${firstname} ${lastname}`,
        recipient: this.configService.get('DEVELOPER_EMAIL') as string,
        body: `Your password is ${password}`,
      });

      return {
        message: 'Employee added successfully',
      };
    } catch (error: unknown) {
      await queryRunner.rollbackTransaction();
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(`An error occurred`);
    } finally {
      await queryRunner.release();
    }
  }
}
