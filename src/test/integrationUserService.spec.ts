import { InMemoryUserRepo } from "../adapters/driven/inMemoryUserRepo";
import { User } from "../domain/user";
import { UserService } from "../services/userService";

describe("UserService (Intégration avec InMemoryUserRepo)", () => {
	let repository: InMemoryUserRepo;
	let service: UserService;

	beforeEach(() => {
		// On utilise les vraies implémentations
		repository = new InMemoryUserRepo();
		service = new UserService(repository);
	});

	it("devrait créer un utilisateur et lui attribuer un ID", async () => {
		const input = {
			nom: "Dupont",
			prenom: "Jean",
		};

		// Action
		const created = await service.createUser(input);

		// Vérification
		expect(created.userId).toBeDefined();
		expect(created.nom).toBe("Dupont");

		// Vérification en "base" (RAM)
		const found = await service.getUser(created.userId!);
		expect(found).toEqual(created);
	});

	it("devrait retourner tous les utilisateurs présents", async () => {
		// On pré-remplit la RAM
		await service.createUser({ nom: "User1", prenom: "P1" });
		await service.createUser({ nom: "User2", prenom: "P2" });

		// Action
		const list = await service.listUsers();

		// Vérification
		expect(list.length).toBe(2);
		expect(list[0].nom).toBe("User1");
	});

	it("devrait modifier le nom d'un utilisateur existant", async () => {
		// 1. Création
		const original = await service.createUser({
			nom: "Martin",
			prenom: "Alice",
		});

		// 2. Modification
		const updatedData = new User("Martin-Zola", "Alice", original.userId);
		const result = await service.updateUser(updatedData);

		// 3. Vérification
		expect(result.nom).toBe("Martin-Zola");

		// On vérifie que c'est bien persistant
		const persisted = await service.getUser(original.userId!);
		expect(persisted?.nom).toBe("Martin-Zola");
	});

	it("devrait supprimer un utilisateur et retourner le message de succès", async () => {
		// 1. Création
		const user = await service.createUser({ nom: "Doe", prenom: "John" });

		// 2. Action
		const message = await service.deleteUser(user.userId!);

		// 3. Vérification
		expect(message).toBe("User deleted successfully");

		// On vérifie qu'il n'est plus là
		const found = await service.getUser(user.userId!);
		expect(found).toBeNull();
	});

	it("devrait échouer si on tente de supprimer un utilisateur qui n'existe pas", async () => {
		// On s'attend à ce que l'erreur lancée par le Repo remonte
		await expect(service.deleteUser("id-inexistant")).rejects.toThrow(
			"User not found"
		);
	});
});
