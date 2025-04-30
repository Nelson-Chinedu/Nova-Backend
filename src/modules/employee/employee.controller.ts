import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body(new ValidationPipe()) createEmployeeDto: CreateEmployeeDto,
  ): Promise<{
    message: string;
  }> {
    return this.employeeService.create(createEmployeeDto);
  }
}
