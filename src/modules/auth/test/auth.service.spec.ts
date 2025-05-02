import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

jest.mock('../auth.service');

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AuthService],
      controllers: [],
    }).compile();
    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(authService).toBeDefined();
  });
});
