
import { Role } from "./role";
export interface User {
  id?: string;
  avatarId?: string,
  email: string,
  firstName: string,
  lastName: string,
  roles: Role[],
  locked: boolean
}

