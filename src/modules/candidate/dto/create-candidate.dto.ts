import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PIPELINE_STAGE } from 'src/common/constant/pipeline-stage';

export class CreateCandidateDto {
  @ApiProperty({ description: 'Candidate first name', example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'Candidate last name', example: 'Josh' })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Candidate email address',
    example: 'josh@email.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Candidate social handle', example: 'LinkedIn' })
  @IsNotEmpty()
  @IsString()
  social: string;

  @ApiProperty({
    description: 'Social handle url',
    example: 'https://linkedin.com',
  })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ description: 'Candidate pipeline stage', default: 'sourced' })
  @IsNotEmpty()
  @IsEnum(PIPELINE_STAGE, {
    message:
      'pipeline_stage must be one of: sourced, in_progress, interview, hired, rejection',
  })
  pipeline_stage: PIPELINE_STAGE;
}

export class CreateCandidateResponse {
  @ApiProperty({
    example: 'Candidate added successfully',
  })
  message: string;
}
