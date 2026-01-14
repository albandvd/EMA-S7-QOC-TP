import { Cercle, createCercleDTO } from '../../domain/cercle';

export interface CerclePort {
  listCercles(): Promise<Cercle[]>;
  getCercle(id: string): Promise<Cercle | null>;
  createCercle(input: createCercleDTO): Promise<Cercle>;
  updateCercle(input: Cercle): Promise<Cercle>;
  deleteCercle(id: string): Promise<string>;
}