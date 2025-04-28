import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import ms from 'ms';

type JwtPayload = {
  id: string;
};

@Injectable()
export class TokenService {
  constructor() {}
  createToken(
    payload: JwtPayload,
    secret: string,
    expiresIn: ms.StringValue,
  ): string {
    try {
      const token = jwt.sign(payload, secret, { expiresIn });
      return token;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred');
    }
  }
}
