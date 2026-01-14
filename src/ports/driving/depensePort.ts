import { Depense } from "../../domain/depense";

export interface DepensePort {
	listDepenses(): Promise<Depense[]>;
	getDepense(depenseId: string): Promise<Depense | null>;
	createDepense(input: Omit<Depense, "depenseId">): Promise<Depense>;
	updateDepense(depenseId: string, input: Depense): Promise<Depense>;
	deleteDepense(depenseId: string): Promise<void>;
}
