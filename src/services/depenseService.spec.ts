import { DepenseService } from "./depenseService";
import { Depense } from "../domain/depense";

describe("DepenseService", () => {
	let mockRepo: {
		findAll: jest.Mock<Promise<Depense[]>, []>;
		findById: jest.Mock<Promise<Depense | null>, [string]>;
		save: jest.Mock<Promise<Depense>, [Omit<Depense, "DepenseId">]>;
		modify: jest.Mock<Promise<Depense>, [Depense]>;
		delete: jest.Mock<Promise<void>, [string]>;
	};
	let service: DepenseService;

	beforeEach(() => {
		mockRepo = {
			findAll: jest.fn(),
			findById: jest.fn(),
			save: jest.fn(),
			modify: jest.fn(),
			delete: jest.fn(),
		};
		service = new DepenseService(mockRepo as any);
	});

	it("listDepenses retourne la liste fournie par le repo", async () => {
		const sample: Depense[] = [
			{
				depenseId: "1",
				description: "course de la semaine",
				montant: 41,
				userId: "1",
				enseigne: "Intermarché",
				date: new Date("2026-01-10"),
			} as unknown as Depense,
		];
		mockRepo.findAll.mockResolvedValue(sample);
		await expect(service.listDepenses()).resolves.toEqual(sample);
		expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
	});

	it("getDepense retourne la dépense quand elle existe", async () => {
		const depense: Depense = {
			depenseId: "1",
			description: "course de la semaine",
			montant: 41,
			userId: "1",
			enseigne: "Intermarché",
			date: new Date("2026-01-10"),
		} as unknown as Depense;
		mockRepo.findById.mockResolvedValue(depense);
		await expect(service.getDepense("1")).resolves.toEqual(depense);
		expect(mockRepo.findById).toHaveBeenCalledWith("1");
	});

	it("createDepense appelle save et retourne la dépense créée", async () => {
		const input: Omit<Depense, "depenseId"> = {
			description: "course de la semaine",
			montant: 41,
			userId: "1",
			enseigne: "Intermarché",
			date: new Date("2026-01-10"),
		} as unknown as Omit<Depense, "depenseId">;
		const saved: Depense = { depenseId: "2", ...input } as unknown as Depense;
		mockRepo.save.mockResolvedValue(saved);
		await expect(service.createDepense(input)).resolves.toEqual(saved);
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});

	it("updateDepense appelle modify et retourne la dépense modifiée", async () => {
		const input: Depense = {
			depenseId: "2",
			description: "course de la semaine",
			montant: 42,
			userId: "1",
			enseigne: "Intermarché",
			date: new Date("2026-01-10"),
		} as unknown as Depense;
		const modified: Depense = { ...input } as unknown as Depense;
		mockRepo.modify.mockResolvedValue(modified);
		await expect(service.updateDepense(input, "2")).resolves.toEqual(modified);
		expect(mockRepo.modify).toHaveBeenCalledWith(input, "2");
	});

	it("deleteDepense appelle delete avec le bon id", async () => {
		mockRepo.delete.mockResolvedValue();
		await expect(service.deleteDepense("2")).resolves.toBeUndefined();
		expect(mockRepo.delete).toHaveBeenCalledWith("2");
	});
});
