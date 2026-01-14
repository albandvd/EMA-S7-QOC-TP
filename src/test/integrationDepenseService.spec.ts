import { DepenseService } from "../services/depenseService";
import { InMemoryDepenseRepo } from "../adapters/driven/inMemoryDepenseRepo";
import { Depense } from "../domain/depense";

describe("DepenseService (Intégration avec InMemoryRepo)", () => {
	let repository: InMemoryDepenseRepo;
	let service: DepenseService;

	beforeEach(() => {
		// On instancie le vrai repo et le vrai service
		repository = new InMemoryDepenseRepo();
		service = new DepenseService(repository);
	});

	it("devrait créer une dépense et l'ajouter au store", async () => {
		const input = {
			description: "Courses",
			montant: 50,
			userId: "user-1",
			magasin: "Carrefour",
			date: new Date(),
		};

		// On appelle le service
		const created = await service.createDepense(input);

		// VÉRIFICATION : On vérifie que l'ID a bien été généré (UUID)
		expect(created.depenseId).toBeDefined();

		// On vérifie que si on demande au service (via le repo), la donnée est bien là
		const found = await service.getDepense(created.depenseId!);
		expect(found).toEqual(created);
	});

	it("devrait modifier une dépense existante dans le store", async () => {
		// 1. Initialisation : on crée une donnée
		const initial = await service.createDepense({
			description: "Essence",
			montant: 60,
			userId: "1",
			magasin: "Total",
			date: new Date(),
		});

		// 2. Préparation du changement
		const updatedData = new Depense(
			"Essence modifiée",
			70, // On change le montant
			initial.userId,
			initial.magasin,
			initial.date,
			initial.depenseId
		);

		// 3. Action
		await service.updateDepense(updatedData, initial.depenseId!);

		// 4. Vérification d'intégration : on va voir si la RAM a bien été mise à jour
		const result = await service.getDepense(initial.depenseId!);
		expect(result?.montant).toBe(70);
		expect(result?.description).toBe("Essence modifiée");
	});

	it("devrait supprimer une dépense du store", async () => {
		const created = await service.createDepense({
			description: "À supprimer",
			montant: 10,
			userId: "1",
			magasin: "Test",
			date: new Date(),
		});

		await service.deleteDepense(created.depenseId!);

		const found = await service.getDepense(created.depenseId!);
		expect(found).toBeNull();
	});

	it("devrait lever une erreur si on modifie une dépense inexistante", async () => {
		const fakeDepense = new Depense(
			"test",
			10,
			"1",
			"test",
			new Date(),
			"fake-id"
		);

		// On vérifie que l'erreur lancée par le REPO remonte bien par le SERVICE
		await expect(service.updateDepense(fakeDepense, "fake-id")).rejects.toThrow(
			"Depense not found"
		);
	});
});
