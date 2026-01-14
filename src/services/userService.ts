import { User } from '../domain/user';
import { UserRepositoryPort } from '../ports/driven/repoPort';
import { UserPort } from "../ports/driving/userPort";

export class UserService implements UserPort {
  constructor(private repo: UserRepositoryPort) {}

  async listUsers(): Promise<User[]> {
     return this.repo.findAll();
  }

  async getUser(id: string): Promise<User | null> {
    return this.repo.findById(id);
  }

  async createUser(input: Omit<User, 'userId'>): Promise<User> {
    return this.repo.save(input);
  }

  async updateUser(input: User): Promise<User> {
    return this.repo.modify(input);
  }

  async deleteUser(id: string): Promise<string> {
    return this.repo.delete(id);
  }
}
