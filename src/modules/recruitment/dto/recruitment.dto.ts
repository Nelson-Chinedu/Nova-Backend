import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRecruitmentDto {
  @ApiProperty({ example: 'Senior Software Engineer' })
  @IsString()
  @IsNotEmpty()
  job_title: string;

  @ApiProperty({ example: 'Fulltime' })
  @IsString()
  @IsNotEmpty()
  job_type: string;

  @ApiProperty({ example: 'Engineering' })
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty({ example: 'Onsite' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'Brief description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Brief intro about the company' })
  @IsString()
  @IsNotEmpty()
  about_company: string;

  @ApiProperty({ example: '20/03/2025' })
  @IsString()
  @IsNotEmpty()
  active_until: string;
}
