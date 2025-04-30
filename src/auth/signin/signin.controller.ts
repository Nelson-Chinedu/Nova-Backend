import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { Response } from 'express';
import { SigninService } from './signin.service';
import { SigninDto } from './dto/signin.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { cookieOptions } from '../../common/constant/cookieOptions';

@Controller('auth')
export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  @Post('signin')
  @HttpCode(200)
  async login(
    @Body(new ValidationPipe()) signinDto: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user: { data: string | null; message: string } =
      await this.signinService.login(signinDto);

    res.cookie('cid', user.data, cookieOptions);
    return { message: user.message };
  }
}
