import { applyDecorators, HttpCode, HttpStatus, Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const CreateDecorator = ({
  summary,
  description,
  type,
}: {
  summary: string;
  description: string;
  type?: Type<unknown>;
}) => {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBadRequestResponse({ description: 'Bad payload' }),
    ApiCreatedResponse({ description, type }),
    HttpCode(HttpStatus.CREATED),
  );
};
