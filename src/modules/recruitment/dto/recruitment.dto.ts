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

export class RecruitmentResponse {
  @ApiProperty({ example: '7a61c3a7-6d9a-4243-b919-41ab1e9ae507' })
  id: string;

  @ApiProperty({ example: 'Senior Software Engineer' })
  job_title: string;

  @ApiProperty({ example: 'Fulltime' })
  job_type: string;

  @ApiProperty({ example: 'Engineering' })
  department: string;

  @ApiProperty({ example: 'Onsite' })
  location: string;

  @ApiProperty({ example: 'this is just the job description' })
  description: string;

  @ApiProperty({ example: 'this is just about the company' })
  about_company: string;

  @ApiProperty({ example: '20/03/2025' })
  active_until: string;

  @ApiProperty({ example: '2025-05-12T16:10:57.028Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-05-12T16:10:57.028Z' })
  updatedAt: string;
}

export class PaginatedRecruitmentResponse {
  @ApiProperty({ type: [RecruitmentResponse] })
  data: RecruitmentResponse[];

  @ApiProperty({ example: 1 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 1 })
  lastPage: number;
}
