import { newUserStub, passwordStub } from '../test/stubs/signup.stubs';

export const SignupService = jest.fn().mockReturnValue({
  hashPassword: jest.fn().mockResolvedValue(passwordStub()),
  createUser: jest.fn().mockResolvedValue(newUserStub()),
});
