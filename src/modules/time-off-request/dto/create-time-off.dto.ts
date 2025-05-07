import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTimeOffDto {
  @ApiProperty({ description: 'Leave type', example: 'Annual leave' })
  @IsString()
  @IsNotEmpty()
  leaveType: string;

  @ApiProperty({ example: new Date() })
  @IsString()
  @IsNotEmpty()
  leaveFrom: string;

  @ApiProperty({ example: new Date() })
  @IsString()
  @IsNotEmpty()
  leaveTo: string;
}

export class CreateTimeOffResponse {
  @ApiProperty({
    example: 'Request time off created successfully',
  })
  message: string;
}
