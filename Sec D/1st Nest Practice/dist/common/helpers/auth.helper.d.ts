import { IRequest } from "../interfaces/request.interface";
import { AuthUser } from "../interfaces/auth-user.interface";
export declare const getCurrentUser: (req: IRequest) => AuthUser | "You are not authenticated" | "Invalid token";
