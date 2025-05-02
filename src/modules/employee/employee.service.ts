import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { generate } from 'generate-password';

import { CreateEmployeeDto } from './dto/employee.dto';

import Account from '../auth/entities/account.entity';
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

  /**
   * Create a new employee
   * @param {object} createEmployeeDto
   * @returns {object}
   */
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

  /**
   * Get all employees
   * @param {number} page - the current page number
   * @param {number} limit - the number of items per page
   * @returns {object[]}
   */
  async getAllEmployees(page: number, limit: number) {
    try {
      const [data, total] = await this.dataSource
        .getRepository(Profile)
        .createQueryBuilder('profile')
        .leftJoin('profile.account', 'account')
        .select([
          'profile.id',
          'profile.firstname',
          'profile.lastname',
          'profile.phone_number',
          'profile.department',
          'profile.job_title',
          'profile.contract_type',
          'profile.image_url',
          'profile.createdAt',
          'profile.updatedAt',
          'account.email',
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  /**
   * Get an employee by id
   * @param {uuid} id - UUID of an employee
   * @returns {object}
   */
  async getEmployee(id: string) {
    try {
      const result = await this.dataSource
        .getRepository(Profile)
        .createQueryBuilder('profile')
        .leftJoin('profile.account', 'account')
        .select([
          'profile.id',
          'profile.firstname',
          'profile.lastname',
          'profile.phone_number',
          'profile.department',
          'profile.job_title',
          'profile.contract_type',
          'profile.image_url',
          'profile.createdAt',
          'profile.updatedAt',
          'account.email',
        ])
        .where('profile.id = :id', { id })
        .getOne();

      if (!result) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
