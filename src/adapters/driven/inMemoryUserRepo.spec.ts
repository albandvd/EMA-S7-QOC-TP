import { User, createUserDTO } from "../../domain/user";
import { InMemoryUserRepo } from "./inMemoryUserRepo";

describe("InMemoryUserRepo", () => {
    jest.mock("uuid", () => ({ v4: () => "123456789" }));
    let repo: InMemoryUserRepo;
    let users: User[] = [];

    beforeEach(async () => {
        users = [];
        repo = new InMemoryUserRepo(users);
    });

    it("should save an user", async () => {
        const userData = new createUserDTO("doe", "john");
        const savedUser = await repo.save(userData);

        expect(savedUser).toHaveProperty("userId");
        expect(savedUser.nom).toBe(userData.nom);
        expect(savedUser.prenom).toBe(userData.prenom);
        expect(users.length).toBe(1);
    });

    it("should get all users by duplicating variable", async () => {
        users = [new User("doe", "john"), new User("doe", "jane")];
        repo = new InMemoryUserRepo(users);
        const allUsers = await repo.findAll();

        expect(allUsers).toEqual(users);
        expect(allUsers).not.toBe(users);
    });

    it("should find user by id", async () => {
        const user = new User("john", "doe", "1");
        users.push(user);
        repo = new InMemoryUserRepo(users);

        const foundUser = await repo.findById(user.userId!);
        expect(foundUser).toEqual(user);
    });

    it("should return null if user not found", async () => {
        const foundUser = await repo.findById("non-existent-id");
        expect(foundUser).toBeNull();
    });
});
