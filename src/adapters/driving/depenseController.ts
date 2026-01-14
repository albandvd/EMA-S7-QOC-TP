import { Express } from "express";
import { createDepenseDTO, Depense } from "../../domain/depense";
import { DepensePort } from "../../ports/driving/depensePort";
import { Request, Response } from "express";

export class AddressController {
	private service: DepensePort;

	constructor(private readonly depenseService: DepensePort) {
		this.service = depenseService;
	}

	registerRoutes(app: Express) {
		app.get("/depense", this.listDepenses.bind(this));
		app.post("/depense", this.createDepense.bind(this));
		app.get("/depense/:demandeId", this.getDepense.bind(this));
		app.get("/depense/:demandeId", this.updateDepense.bind(this));
		app.get("/depense/:demandeId", this.deleteDepense.bind(this));
	}

	async listDepenses(): Promise<Depense[]> {
		return await this.service.listDepenses();
	}
	async getDepense(depenseId: string): Promise<Depense | null> {
		return await this.service.getDepense(depenseId);
	}
	async createDepense(input: Omit<Depense, "depenseId">): Promise<Depense> {
		return await this.service.createDepense(input);
	}
	async updateDepense(input: Depense): Promise<Depense> {
		return await this.service.updateDepense(input);
	}
	async deleteDepense(depenseId: string): Promise<void> {
		return await this.service.deleteDepense(depenseId);
	}
}
