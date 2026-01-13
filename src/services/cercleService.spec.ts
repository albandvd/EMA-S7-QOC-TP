import { CercleService } from './cercleService';
import { Cercle } from '../domain/cercle';

describe('CercleService', () => {
  let mockRepo: {
    findAll: jest.Mock<Promise<Cercle[]>, []>;
    findById: jest.Mock<Promise<Cercle | null>, [string]>;
    save: jest.Mock<Promise<Cercle>, [Omit<Cercle, 'CercleId'>]>;
    modify: jest.Mock<Promise<Cercle>, [Cercle]>;
    delete: jest.Mock<Promise<void>, [string]>;

  };
  let service: CercleService;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      modify: jest.fn(),
      delete: jest.fn(),
    };
    service = new CercleService(mockRepo as any);
  });

  it('listCercles retourne la liste fournie par le repo', async () => {
    const sample: Cercle[] = [{ cercleId: '1', nom: 'Cercle A', userList: ['1', '2'] } as unknown as Cercle];
    mockRepo.findAll.mockResolvedValue(sample);
    await expect(service.listCercles()).resolves.toEqual(sample);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('getCercles retourne le cercle quand il existe', async () => {
    const cercle: Cercle = { cercleId: '1', nom: 'Cercle A', userList: ['1', '2'] } as unknown as Cercle;
    mockRepo.findById.mockResolvedValue(cercle);
    await expect(service.getCercle('1')).resolves.toEqual(cercle);
    expect(mockRepo.findById).toHaveBeenCalledWith('1');
  });

  it('createCercle appelle save et retourne le cercle créé', async () => {
    const input: Omit<Cercle, 'cercleId'> = { nom: 'Cercle B', userList: ['3', '4'] } as unknown as Omit<Cercle, 'cercleId'>;
    const saved: Cercle = { cercleId: '2', ...input } as unknown as Cercle;
    mockRepo.save.mockResolvedValue(saved);
    await expect(service.createCercle(input)).resolves.toEqual(saved);
    expect(mockRepo.save).toHaveBeenCalledWith(input);
  });

  it('updateCercle appelle modify et retourne le cercle modifié', async () => {
    const input: Cercle = { cercleId: '2', nom: 'Cercle B', userList: ['3', '4'] } as unknown as Cercle;
    const modified: Cercle = { ...input } as unknown as Cercle;
    mockRepo.modify.mockResolvedValue(modified);
    await expect(service.updateCercle(input)).resolves.toEqual(modified);
    expect(mockRepo.modify).toHaveBeenCalledWith(input);
  });

  it('deleteCercle appelle delete avec le bon id', async () => {
    mockRepo.delete.mockResolvedValue();
    await expect(service.deleteCercle('2')).resolves.toBeUndefined();
    expect(mockRepo.delete).toHaveBeenCalledWith('2');
  });
});

