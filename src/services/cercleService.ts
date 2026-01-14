import { Cercle, createCercleDTO } from "../domain/cercle";
import { CercleRepositoryPort } from "../ports/driven/repoPort";
import { CerclePort } from "../ports/driving/cerclePort";

export class CercleService implements CerclePort {
	constructor(private repo: CercleRepositoryPort) {}
	async listCercles(): Promise<Cercle[]> {
		return this.repo.findAll();
	}

	async getCercle(id: string): Promise<Cercle | null> {
		return this.repo.findById(id);
	}

	async createCercle(input: createCercleDTO): Promise<Cercle> {
		return this.repo.save(input);
	}

	async updateCercle(input: Cercle): Promise<Cercle> {
		return this.repo.modify(input);
	}

	async deleteCercle(id: string): Promise<string> {
		return this.repo.delete(id);
	}

	async addUserToCercle(
		cercleId: string,
		userId: string
	): Promise<Cercle | null> {
		const cercle = await this.repo.findById(cercleId);
		if (!cercle) {
			return null;
		}
		if (!cercle.userList.includes(userId)) {
			cercle.userList.push(userId);
			return this.repo.modify(cercle);
		}
		return cercle;
	}

	async removeUserFromCercle(
		cercleId: string,
		userId: string
	): Promise<Cercle | null> {
		const cercle = await this.repo.findById(cercleId);
		if (!cercle) {
			return null;
		}
		const index = cercle.userList.indexOf(userId);
		if (index !== -1) {
			cercle.userList.splice(index, 1);
			return this.repo.modify(cercle);
		}
		return cercle;
	}
}
