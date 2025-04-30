import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from '../signup.service';

jest.mock('../signup.service');

describe('SignupService', () => {
  let signupService: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [SignupService],
      controllers: [],
    }).compile();
    signupService = module.get<SignupService>(SignupService);

    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(signupService).toBeDefined();
  });
});
