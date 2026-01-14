import { Address } from "../../domain/address";
import { createUserDTO, User } from "../../domain/user";
import { createDepenseDTO, Depense } from "../../domain/depense";
import { Cercle, createCercleDTO } from "../../domain/cercle";

export interface AddressRepositoryPort {
	findAll(): Promise<Address[]>;
	findById(id: string): Promise<Address | null>;
	save(address: Omit<Address, "id">): Promise<Address>;
}

export interface UserRepositoryPort {
	findAll(): Promise<User[]>;
	findById(id: string): Promise<User | null>;
	save(user: createUserDTO): Promise<User>;
	modify(user: User): Promise<User>;
	delete(id: string): Promise<string>;
}

export interface DepenseRepositoryPort {
	findAll(): Promise<Depense[]>;
	findById(id: string): Promise<Depense | null>;
	save(depense: createDepenseDTO): Promise<Depense>;
	modify(depense: Depense, depenseId: string): Promise<Depense>;
	delete(id: string): Promise<void>;
}

export interface CercleRepositoryPort {
	findAll(): Promise<Cercle[]>;
	findById(id: string): Promise<Cercle | null>;
	save(cercle: createCercleDTO): Promise<Cercle>;
	modify(cercle: Cercle): Promise<Cercle>;
	delete(id: string): Promise<string>;
}
