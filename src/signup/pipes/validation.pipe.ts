import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance, ClassConstructor } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform<T extends object>(
    value: T,
    { metatype }: ArgumentMetadata,
  ): Promise<T> {
    if (!metatype || !this.isCustomClass(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype as ClassConstructor<T>, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const detailedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errors: detailedErrors,
      });
    }

    return value;
  }

  private isCustomClass(
    metatype: unknown,
  ): metatype is ClassConstructor<object> {
    return (
      typeof metatype === 'function' &&
      ![String, Boolean, Number, Array, Object].includes(metatype as never)
    );
  }
}
