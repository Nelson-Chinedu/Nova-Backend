import { Module } from '@nestjs/common';

import { EmployeeService } from './employee.service';

import { EmployeeController } from './employee.controller';

import { HashPasswordService, MailService } from 'src/common/service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, HashPasswordService, MailService],
})
export class EmployeeModule {}
