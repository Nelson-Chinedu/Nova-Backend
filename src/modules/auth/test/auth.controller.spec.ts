import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { AuthService } from '../auth.service';

import { AuthController } from '../auth.controller';

import {
  signupStub,
  newUserStub,
  signinStub,
  signInResponseStub,
} from './stubs/auth.stubs';

jest.mock('../auth.service');

const mockResponse = () => {
  const res: Partial<Response> = {
    cookie: jest.fn(),
  };
  return res as Response;
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      test('then it should call signupService', async () => {
        const result = await authController.createUser(signupStub());
        expect(authService.createUser).toHaveBeenCalledWith(signupStub());
        expect(result).toEqual(newUserStub());
      });
    });
  });

  describe('login user', () => {
    describe('when login user is called', () => {
      test('should log in', async () => {
        const res = mockResponse();
        const result = await authController.login(signinStub(), res);
        expect(authService.login).toHaveBeenCalledWith(signinStub());
        expect(res.cookie).toHaveBeenCalledWith(
          'cid',
          signInResponseStub().data,
          expect.objectContaining({ httpOnly: true }),
        );
        expect(result).toEqual({ message: signInResponseStub().message });
      });
    });
  });
});
