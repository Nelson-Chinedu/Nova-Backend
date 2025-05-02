import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { CreateUserDto } from './dto/create-user.dto';
import { SigninDto } from './dto/signin.dto';

import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Public } from '../../common/decorators/public.decorator';
import { cookieOptions } from '../../common/constant/cookieOptions';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.authService.createUser({
      ...createUserDto,
    });
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(new ValidationPipe()) signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: { data: string | null; message: string } =
      await this.authService.login(signinDto);

    res.cookie('cid', user.data, cookieOptions);
    return { message: user.message };
  }
}
