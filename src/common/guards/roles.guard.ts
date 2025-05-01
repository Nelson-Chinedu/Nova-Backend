import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

import { IAunthenticatedUser } from '../../interface/IAuthUser';

interface AuthenticatedRequest extends Request {
  user: IAunthenticatedUser;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    if (!user) throw new UnauthorizedException('Unauthorized');

    if (!roles.includes(user.role))
      throw new ForbiddenException(
        `You currently do not have access to this feature with ${user.role} role.`,
      );

    return true;
  }
}
