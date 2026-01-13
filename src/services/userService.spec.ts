import { UserService } from './userService';
import { User } from '../domain/user';

describe('UserService', () => {
  let mockRepo: {
    findAll: jest.Mock<Promise<User[]>, []>;
    findById: jest.Mock<Promise<User | null>, [string]>;
    save: jest.Mock<Promise<User>, [Omit<User, 'id'>]>;
    modify: jest.Mock<Promise<User>, [User]>;
    delete: jest.Mock<Promise<void>, [string]>;
  };
  let service: UserService;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      modify: jest.fn(),
      delete: jest.fn(),
    };
    service = new UserService(mockRepo as any);
  });

  it('listUsers retourne la liste fournie par le repo', async () => {
    const sample: User[] = [{ userId: '1', nom: 'John', prenom: 'Doe' } as unknown as User];
    mockRepo.findAll.mockResolvedValue(sample);
    await expect(service.listUsers()).resolves.toEqual(sample);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('getUser retourne l\'utilisateur quand il existe', async () => {
    const user: User = { userId: '1', nom: 'John', prenom: 'Doe' } as unknown as User;
    mockRepo.findById.mockResolvedValue(user);
    await expect(service.getUser('1')).resolves.toEqual(user);
    expect(mockRepo.findById).toHaveBeenCalledWith('1');
  });

  it('createUser appelle save et retourne l\'utilisateur créé', async () => {
    const input: Omit<User, 'userId'> = { nom: 'John', prenom: 'Doe' } as unknown as Omit<User, 'userId'>;
    const saved: User = { userId: '2', ...input } as unknown as User;
    mockRepo.save.mockResolvedValue(saved);
    await expect(service.createUser(input)).resolves.toEqual(saved);
    expect(mockRepo.save).toHaveBeenCalledWith(input);
  });

  it('updateUser appelle modify et retourne l\'utilisateur modifié', async () => {
    const input: User = { userId: '2', nom: 'Jane', prenom: 'Doe' } as unknown as User;
    const modified: User = { ...input } as unknown as User;
    mockRepo.modify.mockResolvedValue(modified);
    await expect(service.updateUser(input)).resolves.toEqual(modified);
    expect(mockRepo.modify).toHaveBeenCalledWith(input);
  });
  
  it('deleteUser appelle delete avec le bon id', async () => {
    mockRepo.delete.mockResolvedValue();
    await expect(service.deleteUser('2')).resolves.toBeUndefined();
    expect(mockRepo.delete).toHaveBeenCalledWith('2');
  });
});

