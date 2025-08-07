import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ example: 'nova@email.com' })
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
