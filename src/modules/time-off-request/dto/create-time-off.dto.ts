import { ApiProperty } from '@nestjs/swagger';
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
}
