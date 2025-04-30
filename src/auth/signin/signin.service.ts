import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import Account from '../signup/entities/signup.entity';
import { MailService, TokenService } from '../../common/service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly mailService: MailService,
    private configService: ConfigService,
    private token: TokenService,
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
        throw new Error(error.message);
      }
      throw new InternalServerErrorException('An error occurred');
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

      const accessToken: string = this.token.createToken(
        { id: account.id },
        this.configService.get('VERIFICATION_JWT_kEY') as string,
        '2d',
      );

      if (process.env.NODE_ENV === 'production' && !account.verified) {
        await this.mailService.sendMail({
          subject: 'Verify your account',
          recipient: this.configService.get('DEVELOPER_EMAIL') as string,
          link: `${this.configService.get('CLIENT_URL')}/auth/verify?t=${accessToken}`,
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
