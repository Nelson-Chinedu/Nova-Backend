import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
  sub: string;
  role: string;
};

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}
  createToken(payload: JwtPayload): Promise<string> {
    try {
      const token = this.jwtService.signAsync(payload);
      return token;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An error occurred');
    }
  }
}
