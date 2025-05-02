import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Firstname must have at least 2 characters' })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Lastname must have at least 2 characters' })
  lastname: string;

  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please provide a valid email address ' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password can not be less than 6' })
  @Matches(passwordRegEx, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. ',
  })
  password: string;
}
