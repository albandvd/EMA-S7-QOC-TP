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

	async listDepenses(req: Request, res: Response): Promise<void> {
		const depenses = await this.service.listDepenses();
		res.json(depenses);
	}
	async getDepense(req: Request, res: Response): Promise<void> {
		const { depenseId } = req.params;
		const depense = await this.service.getDepense(depenseId);
		res.json(depense);
	}
	async createDepense(req: Request, res: Response): Promise<void> {
		const input = req.body;
		const depense = await this.service.createDepense(input);
		res.status(201).json(depense);
	}
	async updateDepense(req: Request, res: Response): Promise<void> {
		const { depenseId } = req.params;
		const input = req.body;
		const depense = await this.service.updateDepense(input, depenseId);
		res.json(depense);
	}
	async deleteDepense(req: Request, res: Response): Promise<void> {
		const { depenseId } = req.params;
		await this.service.deleteDepense(depenseId);
		res.sendStatus(204);
	}
}
