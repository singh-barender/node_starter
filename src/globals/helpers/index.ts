import { IUser, IUserSubset, UserSubset } from '@root/types/user.types';

export const sanitizeAndPrepareUser = (user: IUser | IUserSubset): UserSubset => {
  const { _id, username, firstName, lastName, role, email } = user;
  return { _id, username, firstName, lastName, role, email };
};
