import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateSignupDto } from './dto/create-signup.dto';

import Account from './entities/signup.entity';
import Profile from '../profile/entities/profile.entity';

import { MailService } from '../common/service/mail.service';
import { TokenService } from '../common/service/token.service';
@Injectable()
export class SignupService {
  private readonly saltRounds = 10;
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly mailService: MailService,
    private configService: ConfigService,
    private token: TokenService,
  ) {}

  /**
   *
   * @param password
   * @returns hashed password
   * @description Hashes the string password using bcrypt with a specified number of salt rounds.
   * @throws Error if hashing fails
   */
  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error: unknown) {
      console.log(error, 'ERR');
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error hashing password');
    }
  }
  /**
   *
   * @param createSignupDto
   * @returns userId
   * @description Creates a new user in the database using a transaction.
   * @throws Error if an error occurs during the transaction
   */
  async createUser(createSignupDto: CreateSignupDto) {
    const queryRunner =
      this.accountRepository.manager.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const existingUser = await queryRunner.manager.findOne(Account, {
        where: { email: createSignupDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email address already exist');
      }

      const hashedPassword = await this.hashPassword(createSignupDto.password);

      const newAccount = queryRunner.manager.create(Account, {
        ...createSignupDto,
        password: hashedPassword,
      });

      const accessToken: string = this.token.createToken(
        { id: newAccount.id },
        this.configService.get('VERIFICATION_JWT_kEY') as string,
        '2d',
      );

      await queryRunner.manager.save(newAccount);

      const newProfile = queryRunner.manager.create(Profile, {
        account: newAccount,
      });

      await queryRunner.manager.save(newProfile);

      await queryRunner.commitTransaction();

      await this.mailService.sendMail({
        subject: 'welcome new user',
        recipient: this.configService.get('DEVELOPER_EMAIL') as string,
        link: `${this.configService.get('CLIENT_URL')}/auth/verify?t=${accessToken}`,
      });

      return {
        message: `We just sent a verification link to ${createSignupDto.email}`,
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
