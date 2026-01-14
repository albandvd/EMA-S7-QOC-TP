import { Depense, createDepenseDTO } from "../../domain/depense";
import { DepenseRepositoryPort } from "../../ports/driven/repoPort";
import { v4 as uuidv4 } from "uuid";

export class InMemoryDepenseRepo implements DepenseRepositoryPort {
	constructor(private readonly store: Depense[] = []) {}

	async findAll(): Promise<Depense[]> {
		return this.store.slice();
	}

	async findById(id: string): Promise<Depense | null> {
		const found = this.store.find((s) => s.depenseId === id);
		return found ?? null;
	}

	async save(depense: createDepenseDTO): Promise<Depense> {
		const uuid = uuidv4();

		const newDepense: Depense = new Depense(
			depense.description,
			depense.montant,
			depense.userId,
			depense.magasin,
			depense.date,
			uuid
		);
		this.store.push(newDepense);
		return newDepense;
	}

	async modify(depense: Depense, depenseId: string): Promise<Depense> {
		const index = this.store.findIndex((s) => s.depenseId === depenseId);
		if (index === -1) {
			throw new Error("Depense not found");
		}
		this.store[index] = depense;
		return depense;
	}

	async delete(id: string): Promise<void> {
		const index = this.store.findIndex((s) => s.depenseId === id);
		if (index === -1) {
			throw new Error("Depense not found");
		}
		this.store.splice(index, 1);
	}
}
