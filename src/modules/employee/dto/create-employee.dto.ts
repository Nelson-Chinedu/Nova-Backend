import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Employee first name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'Employee last name', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Employee phone number',
    example: '+2349123419023',
  })
  @IsNotEmpty()
  @IsPhoneNumber('NG', { message: 'Please enter a valid phone number' })
  phone_number: string;

  @ApiProperty({
    description: 'Employee email address',
    example: 'johndoe@email.com',
  })
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide a valid email address' })
  email: string;

  @ApiProperty({ description: 'Employee department', example: 'Engineer' })
  @IsNotEmpty()
  @IsString()
  department: string;

  @ApiProperty({
    description: 'Employee job title',
    example: 'Software Engineer',
  })
  @IsNotEmpty()
  @IsString()
  job_title: string;

  @ApiProperty({ description: 'Employee contract type', example: 'Fulltime' })
  @IsNotEmpty()
  @IsString()
  contract_type: string;
}

export class ConflictResponseDto {
  @ApiProperty({ example: 'Email address already exist' })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 409 })
  statusCode: 409;
}
