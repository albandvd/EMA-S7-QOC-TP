import { Address } from "../../domain/address";
import { User } from "../../domain/user";
import { Depense } from "../../domain/depense";
import { Cercle } from "../../domain/cercle";

export interface AddressRepositoryPort {
	findAll(): Promise<Address[]>;
	findById(id: string): Promise<Address | null>;
	save(address: Omit<Address, "id">): Promise<Address>;
}

export interface UserRepositoryPort {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	save(user: Omit<User, "userId">): Promise<User>;
	modify(user: User): Promise<User>;
	delete(id: string): Promise<void>;
}

export interface DepenseRepositoryPort {
	findAll(): Promise<Depense[]>;
	findById(id: string): Promise<Depense | null>;
	save(depense: Omit<Depense, "depenseId">): Promise<Depense>;
	modify(depense: Depense, depenseId: string): Promise<Depense>;
	delete(id: string): Promise<void>;
}

export interface CercleRepositoryPort {
	findAll(): Promise<Cercle[]>;
	findById(id: string): Promise<Cercle | null>;
	save(cercle: Omit<Cercle, "cercleId">): Promise<Cercle>;
	modify(cercle: Cercle): Promise<Cercle>;
	delete(id: string): Promise<void>;
}
