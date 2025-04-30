import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

import { CreateSignupDto } from './dto/create-signup.dto';

import Account from './entities/signup.entity';
import Profile from '../../profile/entities/profile.entity';

import { MailService } from '../../../common/service/mail.service';
import { TokenService } from '../../../common/service/token.service';
import { HashPasswordService } from '../../../common/service/hash-password.service';

@Injectable()
export class SignupService {
  constructor(
    private readonly mailService: MailService,
    private configService: ConfigService,
    private token: TokenService,
    private hashPassword: HashPasswordService,
    private dataSource: DataSource,
  ) {}

  /**
   *
   * @param createSignupDto
   * @returns userId
   * @description Creates a new user in the database using a transaction.
   * @throws Error if an error occurs during the transaction
   */
  async createUser(createSignupDto: CreateSignupDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.startTransaction();

      const existingUser = await queryRunner.manager.findOne(Account, {
        where: { email: createSignupDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email address already exist');
      }

      const hashedPassword = await this.hashPassword.hash(
        createSignupDto.password,
      );

      const newAccount = queryRunner.manager.create(Account, {
        email: createSignupDto.email,
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
        body: `${this.configService.get('CLIENT_URL')}/auth/verify?t=${accessToken}`,
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
