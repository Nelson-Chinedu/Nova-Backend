import { Test, TestingModule } from '@nestjs/testing';

import { EmployeeService } from '../employee.service';

import { EmployeeController } from '../employee.controller';

import {
  employeeResponseStub,
  employeeStub,
  responseStub,
} from './stubs/employee.stubs';

jest.mock('../employee.service');

describe('SignupController', () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(employeeController).toBeDefined();
  });

  describe('create employee', () => {
    describe('when create is called', () => {
      test('then it should call employeeService', async () => {
        const result = await employeeController.create(employeeStub());
        expect(employeeService.create).toHaveBeenCalledWith(employeeStub());
        expect(result).toEqual(responseStub());
      });
    });
  });

  describe('get all employees', () => {
    describe('when get employees is called', () => {
      test('then it should call getEmployeesService', async () => {
        const result = await employeeController.getAllEmployees(1, 10);
        expect(employeeService.getAllEmployees).toHaveBeenCalled();
        expect(result).toEqual([employeeResponseStub()]);
      });
    });
  });

  describe('get employee', () => {
    describe('when get employee is called', () => {
      test('then it should call getEmployeeService', async () => {
        const result = await employeeController.getEmployee(
          '537ed35f-d6b8-46cb-963c-b7b1631b2a2f',
        );
        expect(employeeService.getEmployee).toHaveBeenCalled();
        expect(result).toEqual(employeeResponseStub());
      });
    });
  });
});
