import { responseStub } from '../test/stubs/signin.stubs';

export const SigninService = jest.fn().mockReturnValue({
  login: jest.fn().mockResolvedValue(responseStub()),
});
