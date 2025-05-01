import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { SigninController } from '../signin.controller';

import { SigninService } from '../signin.service';

import { responseStub, signinStub } from './stubs/signin.stubs';

jest.mock('../signin.service');

const mockResponse = () => {
  const res: Partial<Response> = {
    cookie: jest.fn(),
  };
  return res as Response;
};

describe('SigninController', () => {
  let signinController: SigninController;
  let signinService: SigninService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SigninController],
      providers: [SigninService],
    }).compile();

    signinController = module.get<SigninController>(SigninController);
    signinService = module.get<SigninService>(SigninService);
  });

  test('should be defined', () => {
    expect(signinController).toBeDefined();
  });

  describe('login user', () => {
    describe('when login user is called', () => {
      test('should log in', async () => {
        const res = mockResponse();
        const result = await signinController.login(signinStub(), res);
        expect(signinService.login).toHaveBeenCalledWith(signinStub());
        expect(res.cookie).toHaveBeenCalledWith(
          'cid',
          responseStub().data,
          expect.objectContaining({ httpOnly: true }),
        );
        expect(result).toEqual({ message: responseStub().message });
      });
    });
  });
});
