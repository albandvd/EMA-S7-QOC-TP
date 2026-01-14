import { createDepenseDTO, Depense } from "../../domain/depense";

export interface DepensePort {
	listDepenses(): Promise<Depense[]>;
	getDepense(depenseId: string): Promise<Depense | null>;
	createDepense(input: createDepenseDTO): Promise<Depense>;
	updateDepense(input: Depense, depenseId: string): Promise<Depense>;
	deleteDepense(depenseId: string): Promise<void>;
}
