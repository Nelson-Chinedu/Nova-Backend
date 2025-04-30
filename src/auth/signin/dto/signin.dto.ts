import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
