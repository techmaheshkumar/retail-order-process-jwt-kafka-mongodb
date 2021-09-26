import { Role } from './role';

export class User {
    id!: number;
    username!: string;
    email!: string;
    role!: Role;
    password!: string;
    token!: string;
}
