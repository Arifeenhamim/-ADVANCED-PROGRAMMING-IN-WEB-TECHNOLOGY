import { IRequest } from "@/common/interfaces/request.interface";
import { AuthUser } from "@/common/interfaces/auth-user.interface";

export const getCurrentUser = (req: IRequest) => {
  if (!req.user) return "You are not authenticated";

  const { id } = req.user as AuthUser;

  if (!id) return "Invalid token";

  return req.user;
};
