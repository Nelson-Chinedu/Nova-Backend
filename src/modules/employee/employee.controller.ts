import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { EmployeeService } from './employee.service';

import {
  ConflictResponseDto,
  CreateEmployeeDto,
  EmployeeResponseDto,
  NotFoundEmployeeDto,
} from './dto/employee.dto';

import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Roles } from '../../common/decorators/roles.decorator';
import { SYSTEM_ROLES } from '../../common/constant/system-roles';

@Roles(SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.HR)
@ApiTags('Employees')
@ApiCookieAuth()
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * Create a new employee
   * @param createEmployeeDto
   * @returns {object}
   */
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

  /**
   * Get all employees
   * @param {number} page - current page number
   * @param {number} limit - the number of items per page
   * @returns {object[]}
   */
  @ApiOperation({ summary: 'Fetch all employees' })
  @ApiOkResponse({ description: 'Employees list', type: [EmployeeResponseDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllEmployees(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.employeeService.getAllEmployees(page, limit);
  }

  /**
   * Get an employee
   * @param {uuid} id
   * @returns {object}
   */
  @ApiOperation({ summary: 'Get single employee' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Ok', type: EmployeeResponseDto })
  @ApiNotFoundResponse({
    description: 'Employee not found',
    type: NotFoundEmployeeDto,
  })
  @Get(':id')
  async getEmployee(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.employeeService.getEmployee(id);
  }
}
