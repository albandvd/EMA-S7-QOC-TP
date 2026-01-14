import { User, createUserDTO } from '../../domain/user';

export interface UserPort {
  listUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | null>;
  createUser(input: createUserDTO): Promise<User>;
  updateUser(input: User): Promise<User>;
  deleteUser(id: string): Promise<string>;
}