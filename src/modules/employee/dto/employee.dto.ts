import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

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
  @ApiPropertyOptional({ example: 'Email address already exist' })
  message: string;

  @ApiPropertyOptional({ example: 'Conflict' })
  error: string;

  @ApiPropertyOptional({ example: 409 })
  statusCode: 409;
}

export class AccountDto {
  @ApiProperty({ example: 'test@email.com' })
  @IsEmail()
  email: string;
}

export class EmployeeResponseDto {
  @ApiProperty({ example: '537ed35f-d6b8-46cb-963c-b7b1631b2a2f' })
  id: string;

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

  @ApiProperty({ type: AccountDto })
  @ValidateNested()
  @Type(() => AccountDto)
  account: AccountDto;

  @ApiProperty({ example: '2025-05-02T17:05:54.933Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-05-02T17:05:54.933Z' })
  updatedAt: string;
}

export class NotFoundEmployeeDto {
  @ApiPropertyOptional({ example: 'Employee with id not found' })
  message: string;

  @ApiPropertyOptional({ example: 'Not Found' })
  error: string;

  @ApiPropertyOptional({ example: 404 })
  statusCode: number;
}
