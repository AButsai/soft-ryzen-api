import { Request } from 'express';

export type TUser = {
  email: string;
  id: string;
  roles: string[];
};

export interface MyRequest extends Request {
  user?: any;
}
