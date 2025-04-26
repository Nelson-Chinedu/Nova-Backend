import { PartialType } from '@nestjs/mapped-types';
import { CreateSignupDto } from './create-signup.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateSignupDto extends PartialType(CreateSignupDto) {}
