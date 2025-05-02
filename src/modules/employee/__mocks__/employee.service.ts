import {
  employeeResponseStub,
  responseStub,
} from '../test/stubs/employee.stubs';

export const EmployeeService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(responseStub()),
  getAllEmployees: jest.fn().mockResolvedValue([employeeResponseStub()]),
  getEmployee: jest.fn().mockResolvedValue(employeeResponseStub()),
});
