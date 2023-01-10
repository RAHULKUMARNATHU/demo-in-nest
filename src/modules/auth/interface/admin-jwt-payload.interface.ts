import { Role } from "../constants/role.enum";

export interface AdminJwtPayload {
  email: string;
  role: Role;
}
