import { newUserStub } from '../test/stubs/signup.stubs';

export const SignupService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(newUserStub()),
});
