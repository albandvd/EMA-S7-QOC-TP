import { Cercle } from '../domain/cercle';
import { CercleRepositoryPort } from '../ports/driven/repoPort';
import { CerclePort } from "../ports/driving/cerclePort";

export class CercleService implements CerclePort {
  constructor(private repo: CercleRepositoryPort) {}
  async listCercles(): Promise<Cercle[]> {
    return this.repo.findAll();
  }

  async getCercle(id: string): Promise<Cercle | null> {
    return this.repo.findById(id);
  }

  async createCercle(input: Omit<Cercle, 'cercleId'>): Promise<Cercle> {
    return this.repo.save(input);
  }

  async updateCercle(input: Cercle): Promise<Cercle> {
    return this.repo.modify(input);
  }

  async deleteCercle(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}