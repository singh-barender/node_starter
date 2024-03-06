export type IRole = 'admin' | 'user';

export const enumRoles = ['admin', 'user'];

export const roles: Record<'ADMIN' | 'USER', IRole> = {
  USER: 'user',
  ADMIN: 'admin'
};
