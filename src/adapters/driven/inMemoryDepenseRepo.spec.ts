import { Depense, createDepenseDTO } from "../../domain/depense";
import { InMemoryDepenseRepo } from "./inMemoryDepenseRepo";

describe("inMemoryDepenseRepo", () => {
	jest.mock("uuid", () => ({ v4: () => "123456789" }));
	let repo: InMemoryDepenseRepo;
	let depenses: Depense[] = [];

	beforeEach(async () => {
		depenses = [];
		repo = new InMemoryDepenseRepo(depenses);
	});

	it("should save a spending", async () => {
		const depenseData = new createDepenseDTO(
			"Spending 1",
			50,
			"123456789",
			"Leclerc",
			new Date()
		);
		const savedDepense = await repo.save(depenseData);

		expect(savedDepense).toHaveProperty("depenseId");
		expect(savedDepense.montant).toBe(depenseData.montant);
		expect(depenses.length).toBe(1);
	});

	it("should get all spendings by duplicating variable", async () => {
		depenses = [
			new Depense("Spending 1", 50, "123456789", "Leclerc", new Date()),
		];
		repo = new InMemoryDepenseRepo(depenses);
		const allDepenses = await repo.findAll();

		expect(allDepenses).toEqual(depenses);
		expect(allDepenses).not.toBe(depenses); // Ensure it's a copy
	});

	it("should modify a spending", async () => {
		const depense = new Depense(
			"Spending 1",
			50,
			"123456789",
			"Leclerc",
			new Date(),
			"depense-1"
		);
		depenses.push(depense);
		repo = new InMemoryDepenseRepo(depenses);

		depense.montant = 75;
		const modifiedDepense = await repo.modify(depense);

		expect(modifiedDepense.montant).toBe(75);
		expect(depenses[0].montant).toBe(75);
	});

	it("should throw an error when modifying a non-existent spending", async () => {
		const depense = new Depense(
			"Spending 1",
			50,
			"123456789",
			"Leclerc",
			new Date(),
			"non-existent-id"
		);
		repo = new InMemoryDepenseRepo(depenses);

		await expect(repo.modify(depense)).rejects.toThrow("Depense not found");
	});
});
