import { Request } from "express";
import { AuthUser } from "./auth-user.interface";

export interface IRequest extends Request {
  request_id?: string;
  start_at: number;
  user?: AuthUser;
}
