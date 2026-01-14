import { Cercle, createCercleDTO } from "../../domain/cercle";

export interface CerclePort {
	listCercles(): Promise<Cercle[]>;
	getCercle(id: string): Promise<Cercle | null>;
	createCercle(input: createCercleDTO): Promise<Cercle>;
	updateCercle(input: Cercle): Promise<Cercle>;
	deleteCercle(id: string): Promise<string>;
	addUserToCercle(cercleId: string, userId: string): Promise<Cercle | null>;
	removeUserFromCercle(
		cercleId: string,
		userId: string
	): Promise<Cercle | null>;
}
