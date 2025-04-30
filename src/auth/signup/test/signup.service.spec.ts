import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from '../signup.service';
import { passwordStub, signupStub } from './stubs/signup.stubs';

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

  describe('hashPassword', () => {
    describe('when hashpassword is called', () => {
      test('it should hash a plain password', async () => {
        const result = await signupService.hashPassword(signupStub().password);
        expect(result).toEqual(passwordStub());
      });
    });
  });
});
