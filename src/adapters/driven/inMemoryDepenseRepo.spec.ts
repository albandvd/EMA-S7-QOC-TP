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

		const modifiedDepense = new Depense(
			"Spending 1 Modified",
			75,
			"123456789",
			"Carrefour",
			new Date(),
			"depense-1"
		);

		const result = await repo.modify(modifiedDepense, "depense-1");

		expect(result.description).toBe("Spending 1 Modified");
		expect(result.montant).toBe(75);
		expect(depenses[0].magasin).toBe("Carrefour");
	});

	it("should delete a spending", async () => {
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

		await repo.delete("depense-1");

		expect(depenses.length).toBe(0);
	});
});
