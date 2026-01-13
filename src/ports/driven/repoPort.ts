import { Address } from '../../domain/address';
import { User } from '../../domain/user';

export interface AddressRepositoryPort {
  findAll(): Promise<Address[]>;
  findById(id: string): Promise<Address | null>;
  save(address: Omit<Address, 'id'>): Promise<Address>;
}

export interface UserRepositoryPort {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  save(user: Omit<User, 'userId'>): Promise<User>;
  modify(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}