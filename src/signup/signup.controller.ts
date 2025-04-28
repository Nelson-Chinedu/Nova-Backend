import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { SignupService } from './signup.service';

import { CreateSignupDto } from './dto/create-signup.dto';

import { ValidationPipe } from './pipes/validation.pipe';

@Controller('/api/v1/auth/')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post('signup')
  @HttpCode(201)
  async createUser(
    @Body(new ValidationPipe()) createSignupDto: CreateSignupDto,
  ): Promise<{ message: string }> {
    return this.signupService.createUser({
      ...createSignupDto,
    });
  }
}
