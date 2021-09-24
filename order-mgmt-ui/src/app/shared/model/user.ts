import { Role } from './role';

export class User {
    id!: number;
    name!: string;
    email!: string;
    role!: Role;
    password!: string;
    accessToken!: string;
}
