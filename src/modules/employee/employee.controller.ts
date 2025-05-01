import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { EmployeeService } from './employee.service';

import {
  ConflictResponseDto,
  CreateEmployeeDto,
} from './dto/create-employee.dto';

import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Roles } from '../../common/decorators/roles.decorator';
import { SYSTEM_ROLES } from '../../common/constant/system-roles';

@Roles(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.HR)
@ApiTags('Employees')
@ApiCookieAuth()
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Create new employees
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiCreatedResponse({
    description: 'Employee added successfully',
    type: CreateEmployeeDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad payload',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({
    description: 'Email address already exist',
    type: ConflictResponseDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto,
  ): Promise<{
    message: string;
  }> {
    return this.employeeService.create(createEmployeeDto);
  }

  // Fetch all employees
  @ApiOperation({ summary: 'Fetch all employees' })
  @ApiOkResponse({ description: 'Employees list', type: [CreateEmployeeDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }
}
