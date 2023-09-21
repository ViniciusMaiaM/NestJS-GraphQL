import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service'; // Import UserService if not already imported
import { UserEntity } from './entities/user.entity';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService; // Add userService for mocking

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService, // Provide a mock instance of UserService
          useValue: {
            findOne: jest.fn(),
            findAll: jest.fn(),
            createUser: jest.fn(),
          } as Partial<UserService>,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user entity', async () => {
      const userId = 1;
      const mockUser: UserEntity = {
        id: userId,
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password',
      };

      (userService.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await resolver.getUser(userId);

      expect(userService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toBe(mockUser);
    });
  });

  describe('users', () => {
    it('should receive a list of users', async () => {
      const users = [UserEntity];
      (userService.findAll as jest.Mock).mockResolvedValue(users);

      const result = await resolver.users();

      expect(userService.findAll).toHaveBeenCalled();
      expect(result).toBe(users);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput = {
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password',
      };

      const createdUser: UserEntity = {
        id: 1,
        name: 'Test User',
        email: 'test@gmail.com',
        password: 'password',
      };

      (userService.createUser as jest.Mock).mockResolvedValue(createdUser);

      const result = await resolver.createUser(createUserInput);

      expect(userService.createUser).toHaveBeenCalledWith(createUserInput);
      expect(result).toBe(createdUser);
    });
  });
});
