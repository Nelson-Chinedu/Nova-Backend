import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface AuthenticatedRequest extends Request {
  user?: any;
  cookies: {
    cid?: string;
  };
}

interface JwtPayload {
  sub: string;
  role: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    const secret = this.configService.get<string>('VERIFICATION_JWT_kEY');

    if (!secret)
      throw new Error('JWT secret key missing in environment variable');

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(request: AuthenticatedRequest): string | undefined {
    const authHeader = request.headers.authorization;
    // this line checks if token is stored in header
    if (typeof authHeader === 'string') {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer' && token) {
        return token;
      }
    }

    return request.cookies?.cid; // this line checks for token in cookie if not set in header
  }
}
