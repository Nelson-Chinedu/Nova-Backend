import { responseStub } from '../test/stubs/time-off-request.stub';

export const EmployeeService = jest.fn().mockReturnValue({
  createTimeOff: jest.fn().mockResolvedValue(responseStub()),
});
