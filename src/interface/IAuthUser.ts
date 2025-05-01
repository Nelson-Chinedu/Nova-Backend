import { SYSTEM_ROLES } from '../common/constant/system-roles';

export interface IAunthenticatedUser {
  sub: string;
  role:
    | SYSTEM_ROLES.ADMIN
    | SYSTEM_ROLES.HR
    | SYSTEM_ROLES.SUPER_ADMIN
    | SYSTEM_ROLES.USER;
  iat: string | number;
  exp: string | number;
}
