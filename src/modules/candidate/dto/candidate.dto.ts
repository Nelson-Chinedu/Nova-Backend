import { ApiProperty } from '@nestjs/swagger';

export class CandidateResponse {
  @ApiProperty({ example: '7a61c3a7-6d9a-4243-b919-41ab1e9ae507' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  lastname: string;

  @ApiProperty({ example: 'john@doe.com' })
  email: string;

  @ApiProperty({ example: 'Linkedin' })
  social: string;

  @ApiProperty({ example: 'http://linkedin.com' })
  url: string;

  @ApiProperty({ example: 'sourced' })
  pipeline_stage: string;

  @ApiProperty({ example: '2025-05-12T16:10:57.028Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-05-12T16:10:57.028Z' })
  updatedAt: string;
}

export class PaginatedCandidateResponse {
  @ApiProperty({ type: [CandidateResponse] })
  data: CandidateResponse[];

  @ApiProperty({ example: 1 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 1 })
  lastPage: number;
}
