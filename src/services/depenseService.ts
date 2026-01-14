import { createDepenseDTO, Depense } from "../domain/depense";
import { DepenseRepositoryPort } from "../ports/driven/repoPort";
import { DepensePort } from "../ports/driving/depensePort";

export class DepenseService implements DepensePort {
	constructor(private repo: DepenseRepositoryPort) {}

	async listDepenses(): Promise<Depense[]> {
		return this.repo.findAll();
	}

	async getDepense(id: string): Promise<Depense | null> {
		return this.repo.findById(id);
	}

	async createDepense(input: createDepenseDTO): Promise<Depense> {
		return this.repo.save(input);
	}

	async updateDepense(input: Depense, depenseId: string): Promise<Depense> {
		return this.repo.modify(input, depenseId);
	}

	async deleteDepense(id: string): Promise<void> {
		return this.repo.delete(id);
	}
}
