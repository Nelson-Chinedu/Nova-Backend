import { Test, TestingModule } from '@nestjs/testing';

import { SignupService } from '../signup.service';
import { SignupController } from '../signup.controller';
import {
  signupStub,
  newUserStub,
  // userStub
} from './stubs/signup.stubs';

jest.mock('../signup.service');

describe('SignupController', () => {
  let signupController: SignupController;
  let signupService: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SignupController],
      providers: [SignupService],
    }).compile();

    signupController = module.get<SignupController>(SignupController);
    signupService = module.get<SignupService>(SignupService);
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(signupController).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      test('then it should call signupService', async () => {
        const result = await signupController.createUser(signupStub());
        expect(signupService.createUser).toHaveBeenCalledWith(signupStub());
        expect(result).toEqual(newUserStub());
      });
    });
  });
});
