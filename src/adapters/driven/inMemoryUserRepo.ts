import { User, createUserDTO } from "../../domain/user";
import { UserRepositoryPort } from "../../ports/driven/repoPort";
import { v4 as uuidv4 } from "uuid";

export class InMemoryUserRepo implements UserRepositoryPort {
    constructor(private readonly store: User[] = []) {}

    async findAll(): Promise<User[]> {
        return this.store.slice();
    }

    async findById(id: string): Promise<User | null> {
        const found = this.store.find((s) => s.userId === id);
        return found ?? null;
    }

    async save(user: createUserDTO): Promise<User> {
        const uuid = uuidv4();

        const newUser: User = new User(
            user.nom,
            user.prenom,
            uuid
        );
        this.store.push(newUser);
        return newUser;
    }

    async modify(user: User): Promise<User> {
        const found = this.store.find((s) => s.userId === user.userId);
        if (!found) {
            throw new Error("User not found");
        }
        const index = this.store.indexOf(found);
        this.store[index] = user;
        return user;
    }

    async delete(id: string): Promise<string> {
        const found = this.store.find((s) => s.userId === id);
        if (!found) {
            throw new Error("User not found");
        }
        const index = this.store.indexOf(found);
        this.store.splice(index, 1);
        return 'User deleted successfully';
    }
}