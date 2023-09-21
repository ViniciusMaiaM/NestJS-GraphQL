import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUserInput = {
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password',
      };

      const mockUser: UserEntity = {
        id: 1,
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password',
      };

      const createSpy = jest.spyOn(userRepository, 'create');
      const saveSpy = jest.spyOn(userRepository, 'save');

      createSpy.mockReturnValue(mockUser);
      saveSpy.mockResolvedValue(mockUser);

      const result = await service.createUser(mockUserInput);

      expect(createSpy).toHaveBeenCalledWith(mockUserInput);
      expect(saveSpy).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should find all users', async () => {
      const users: UserEntity[] = [];

      const findSpy = jest.spyOn(userRepository, 'find');
      findSpy.mockResolvedValue(users);

      const result = await service.findAll();

      expect(findSpy).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should find a user by ID', async () => {
      const userId = 1;
      const user: UserEntity = {
        id: userId,
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password',
      };

      const findOneOrFailSpy = jest.spyOn(userRepository, 'findOneOrFail');
      findOneOrFailSpy.mockResolvedValue(user);

      const result = await service.findOne(userId);

      expect(findOneOrFailSpy).toHaveBeenCalledWith({ where: { id: userId } });
      expect(result).toEqual(user);
    });

    it('should throw an error when user is not found', async () => {
      const userId = 999;

      const findOneOrFailSpy = jest.spyOn(userRepository, 'findOneOrFail');
      findOneOrFailSpy.mockRejectedValue(new Error('User not found'));

      await expect(service.findOne(userId)).rejects.toThrowError(
        'User not found',
      );
    });
  });
});
