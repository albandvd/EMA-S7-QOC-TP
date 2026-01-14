import { CercleService } from "../services/cercleService";
import { Cercle } from "../domain/cercle";
import { InMemoryCercleRepo } from "../adapters/driven/inMemoryCercleRepo";

describe("CercleService Integration", () => {
	let repository: InMemoryCercleRepo;
	let service: CercleService;

	beforeEach(() => {
		repository = new InMemoryCercleRepo();
		service = new CercleService(repository);
	});

	it("devrait gérer le cycle de vie complet d'un cercle et de ses membres", async () => {
		// 1. CRÉATION
		const input = { name: "Famille", userList: ["user-1"] };
		const created = await service.createCercle(input);

		expect(created.cercleId).toBeDefined();
		expect(created.name).toBe("Famille");
		expect(created.userList).toContain("user-1");

		// 2. AJOUT D'UN UTILISATEUR (Logique métier)
		// On vérifie que l'ajout est bien persisté dans le repo
		await service.addUserToCercle(created.cercleId!, "user-2");

		const cercleWithNewUser = await service.getCercle(created.cercleId!);
		expect(cercleWithNewUser?.userList).toHaveLength(2);
		expect(cercleWithNewUser?.userList).toContain("user-2");

		// 3. RETRAIT D'UN UTILISATEUR
		await service.removeUserFromCercle(created.cercleId!, "user-1");

		const cercleAfterRemove = await service.getCercle(created.cercleId!);
		expect(cercleAfterRemove?.userList).toEqual(["user-2"]);

		// 4. MODIFICATION DU NOM
		const updatedData = new Cercle(
			"Amis",
			cercleAfterRemove!.userList,
			created.cercleId
		);
		await service.updateCercle(updatedData);

		const finalCercle = await service.getCercle(created.cercleId!);
		expect(finalCercle?.name).toBe("Amis");

		// 5. SUPPRESSION
		const deleteMessage = await service.deleteCercle(created.cercleId!);
		expect(deleteMessage).toBe("Cercle deleted successfully");

		const nullCercle = await service.getCercle(created.cercleId!);
		expect(nullCercle).toBeNull();
	});

	it("devrait renvoyer null si on tente d'ajouter un membre à un cercle inexistant", async () => {
		const result = await service.addUserToCercle("id-bidon", "user-99");
		expect(result).toBeNull();
	});
});
