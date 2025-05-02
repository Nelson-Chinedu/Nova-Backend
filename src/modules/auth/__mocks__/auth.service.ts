import { newUserStub, signInResponseStub } from '../test/stubs/auth.stubs';

export const AuthService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(newUserStub()),
  login: jest.fn().mockResolvedValue(signInResponseStub()),
});
