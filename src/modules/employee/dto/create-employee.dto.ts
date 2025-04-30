import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsPhoneNumber('NG', { message: 'Please enter a valid phone number' })
  phone_number: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  department: string;

  @IsNotEmpty()
  @IsString()
  job_title: string;

  @IsNotEmpty()
  @IsString()
  contract_type: string;
}
