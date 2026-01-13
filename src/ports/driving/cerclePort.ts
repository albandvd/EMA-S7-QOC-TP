import { Cercle } from '../../domain/cercle';

export interface CerclePort {
  listCercles(): Promise<Cercle[]>;
  getCercle(id: string): Promise<Cercle | null>;
  createCercle(input: Omit<Cercle, 'CercleId'>): Promise<Cercle>;
  updateCercle(input: Cercle): Promise<Cercle>;
  deleteCercle(id: string): Promise<void>;
}