import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { SignupService } from './signup.service';

import { CreateSignupDto } from './dto/create-signup.dto';

import { ValidationPipe } from '../../../common/pipes/validation.pipe';

import { Public } from '../../../common/decorators/public.decorator';

@Controller('auth')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body(new ValidationPipe()) createSignupDto: CreateSignupDto,
  ): Promise<{ message: string }> {
    return this.signupService.createUser({
      ...createSignupDto,
    });
  }
}
