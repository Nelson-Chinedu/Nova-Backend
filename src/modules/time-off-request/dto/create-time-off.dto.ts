import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

type DateProp = {
  leaveFrom: string;
  leaveTo: string;
};

const IsValidLeaveRange = (validationOptions?: ValidationOptions) => {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidLeaveRange',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_, args: ValidationArguments) {
          const obj = args.object as DateProp;
          const leaveFrom = new Date(obj.leaveFrom);
          const leaveTo = new Date(obj.leaveTo);
          return leaveFrom <= leaveTo;
        },
        defaultMessage() {
          return 'Leave From date must be before or equal to Leave To date!';
        },
      },
    });
  };
};
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
  @IsValidLeaveRange({ message: 'leaveFrom cannot be greater than leaveTo' })
  leaveTo: string;
}

export class CreateTimeOffResponse {
  @ApiProperty({
    example: 'Request time off created successfully',
  })
  message: string;
}

export class ProfileDto {
  @ApiProperty({ example: 'John' })
  firstname: string;

  @ApiProperty({ example: 'Doe' })
  lastname: string;

  @ApiProperty({ example: '+23493939939939' })
  phone_number: string;

  @ApiProperty({ example: 'Engineering' })
  department: string;

  @ApiProperty({ example: 'Software Engineer' })
  job_title: string;

  @ApiProperty({ example: 'Full time' })
  contract_type: string;

  @ApiProperty({ example: 'https://www/cloudinary.com/' })
  image_url: string;
}

export class TimeOffRequestsResponse {
  @ApiProperty({ example: 'c9b42786-a3ad-435e-ab77-d1070379ffec' })
  id: string;

  @ApiProperty({ example: 'Annual Leave' })
  leaveType: string;

  @ApiProperty({ example: '2025-05-10' })
  leaveFrom: string;

  @ApiProperty({ example: '2025-05-15' })
  leaveTo: string;

  @ApiProperty({ example: 6 })
  leaveDays: number;

  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;

  @ApiProperty({ example: '2025-05-02T17:05:54.933Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-05-02T17:05:54.933Z' })
  updatedAt: string;
}

export class NotFoundRequestDto {
  @ApiPropertyOptional({ example: 'Time off request with id not found' })
  message: string;

  @ApiPropertyOptional({ example: 'Not Found' })
  error: string;

  @ApiPropertyOptional({ example: 404 })
  statusCode: number;
}
