import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';

import Account from './entities/account.entity';
import Profile from '../profile/entities/profile.entity';

import {
  MailService,
  TokenService,
  HashPasswordService,
} from '../../common/service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly mailService: MailService,
    private configService: ConfigService,
    private token: TokenService,
    private hashPassword: HashPasswordService,
    private dataSource: DataSource,
  ) {}

  /**
   *
   * @param password
   * @param hashPassword
   * @returns boolean
   */
  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    try {
      return bcrypt.compare(password, hashPassword);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }

  /**
   *
   * @param createSignupDto
   * @returns userId
   * @description Creates a new user in the database using a transaction.
   * @throws Error if an error occurs during the transaction
   */
  async createUser(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.startTransaction();

      const existingUser = await queryRunner.manager.findOne(Account, {
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email address already exist');
      }

      const hashedPassword = await this.hashPassword.hash(
        createUserDto.password,
      );

      const newAccount = queryRunner.manager.create(Account, {
        email: createUserDto.email,
        password: hashedPassword,
      });

      const accessToken: string = await this.token.createToken({
        sub: newAccount.id,
        role: 'hr', // look for how to default this role
      });

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
        message: `We just sent a verification link to ${createUserDto.email}`,
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
   *
   * @param {object} signinDto
   * @returns {object}
   */
  async login(
    signinDto: SigninDto,
  ): Promise<{ message: string; data: string | null }> {
    const { email, password } = signinDto;
    try {
      const account: Account | null = await this.accountRepository.findOneBy({
        email,
      });

      if (!account || !(await this.comparePassword(password, account.password)))
        throw new UnauthorizedException('Invalid email address or password');

      if (account.blocked)
        throw new ForbiddenException(
          'Your account is blocked, kindly contact admin',
        );

      const accessToken: string = await this.token.createToken({
        sub: account.id,
        role: 'hr', // get the role from the account
      });

      if (process.env.NODE_ENV !== 'production' && !account.verified) {
        await this.mailService.sendMail({
          subject: 'Verify your account',
          recipient: this.configService.get('DEVELOPER_EMAIL') as string,
          body: `${this.configService.get('CLIENT_URL')}/auth/verify?t=${accessToken}`,
        });

        throw new ForbiddenException(
          ` Account not verified, A verification link has been sent to ${email} `,
        );
      }

      return { data: accessToken, message: 'Logged in successfully' };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException('An error occurred');
    }
  }
}
