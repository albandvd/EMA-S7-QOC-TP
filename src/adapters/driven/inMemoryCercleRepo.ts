import { Cercle, createCercleDTO } from "../../domain/cercle";
import { CercleRepositoryPort } from "../../ports/driven/repoPort";
import { v4 as uuidv4 } from "uuid";

export class InMemoryCercleRepo implements CercleRepositoryPort {
    constructor(private readonly store: Cercle[] = []) {}

    async findAll(): Promise<Cercle[]> {
        return this.store.slice();
    }

    async findById(id: string): Promise<Cercle | null> {
        const found = this.store.find((s) => s.cercleId === id);
        return found ?? null;
    }

    async save(cercle: createCercleDTO): Promise<Cercle> {
        const uuid = uuidv4();

        const newCercle: Cercle = new Cercle(
            cercle.name,
            cercle.userList,
            uuid
        );
        this.store.push(newCercle);
        return newCercle;
    }

    async modify(cercle: Cercle): Promise<Cercle> {
        const found = this.store.find((s) => s.cercleId === cercle.cercleId);
        if (!found) {
            throw new Error("Cercle not found");
        }
        const index = this.store.indexOf(found);
        this.store[index] = cercle;
        return cercle;
    }

    async delete(id: string): Promise<string> {
        const found = this.store.find((s) => s.cercleId === id);
        if (!found) {
            throw new Error("Cercle not found");
        }
        const index = this.store.indexOf(found);
        this.store.splice(index, 1);
        return 'Cercle deleted successfully';
    }
}