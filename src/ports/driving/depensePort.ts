import { Depense } from '../../domain/depense';

export interface DepensePort {
  listDepenses(): Promise<Depense[]>;
  getDepense(id: string): Promise<Depense | null>;
  createDepense(input: Omit<Depense, 'depenseId'>): Promise<Depense>;
  updateDepense(input: Depense): Promise<Depense>;
  deleteDepense(id: string): Promise<void>;
}