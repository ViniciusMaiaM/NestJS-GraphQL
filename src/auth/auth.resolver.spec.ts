import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
//import { GqlAuthGuard } from './gql-auth.guard';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        AuthService,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          } as Partial<AuthService>,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should return a login response', async () => {
      const context = {
        user: {
          // Mock the user object as per your implementation
          id: 1,
          name: 'testuser',
          email: 'test@email.com',
          password: '1234',
          // Add other necessary properties
        },
      };

      const mockLoginResponse: LoginResponse = {
        // Mock the login response as per your implementation
        access_token: 'mockedAccessToken',
        user: context.user,
        // Add other necessary properties
      };

      (authService.login as jest.Mock).mockResolvedValue(mockLoginResponse);

      const result = await resolver.login(context);

      expect(authService.login).toHaveBeenCalledWith(context.user);
      expect(result).toBe(mockLoginResponse);
    });
  });
});
