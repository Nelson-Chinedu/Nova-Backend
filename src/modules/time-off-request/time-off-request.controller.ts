import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { differenceInCalendarDays } from 'date-fns';

import { TimeOffRequestsService } from './time-off-request.service';

import {
  CreateTimeOffDto,
  CreateTimeOffResponse,
  NotFoundRequestDto,
  TimeOffRequestsResponse,
} from './dto/create-time-off.dto';

import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Roles } from '../../common/decorators/roles.decorator';

import { SYSTEM_ROLES } from '../../common/constant/system-roles';
import TimeOffRequests from './entities/time-off-requests.entity';

interface IReq {
  user: {
    sub: string;
  };
}

interface IPayload {
  userId: string;
  leaveType: string;
  leaveFrom: string;
  leaveTo: string;
  leaveDays: number;
}

@ApiCookieAuth()
@ApiTags('Time Off Requests')
@Controller('time-off-requests')
export class TimeoffRequestsController {
  constructor(
    private readonly timeOffRequestsService: TimeOffRequestsService,
  ) {}

  /**
   * Create new time off requests
   * @param {object} CreateTimeOffDto
   * @param res
   * @returns {object}
   */
  @ApiOperation({ summary: 'Create time off requests (Employee)' })
  @ApiCreatedResponse({
    description: 'Request time off created successfully',
    type: CreateTimeOffResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad payload',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(SYSTEM_ROLES.USER)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTimeOff(
    @Body(new ValidationPipe()) createTimeOff: CreateTimeOffDto,
    @Req() req: IReq,
  ): Promise<{ message: string }> {
    const numberOfDays =
      differenceInCalendarDays(
        new Date(createTimeOff.leaveTo),
        new Date(createTimeOff.leaveFrom),
      ) + 1;

    const payload: IPayload = {
      ...createTimeOff,
      leaveDays: numberOfDays,
      userId: req.user.sub,
    };

    return this.timeOffRequestsService.createTimeOff(payload);
  }

  /**
   * Get all time off requests
   * @param {number} page - page number for pagination
   * @param {number} limit - limit for number of items per page
   * @returns Promise<object[]>
   */
  @ApiOperation({ summary: 'Get all time off requests' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({
    type: [TimeOffRequestsResponse],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Roles(SYSTEM_ROLES.HR, SYSTEM_ROLES.ADMIN, SYSTEM_ROLES.SUPER_ADMIN)
  @Get()
  async getTimeOffRequests(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
  ): Promise<{
    data: TimeOffRequests[];
    total: number;
    page: number;
    lastPage: number;
  }> {
    return this.timeOffRequestsService.getTimeOffRequests(page, limit);
  }

  /**
   * Get an employee
   * @param {uuid} id - the id of the time off request
   * @returns {object}
   */
  @ApiOperation({ summary: 'Get single time off request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Ok', type: TimeOffRequestsResponse })
  @ApiNotFoundResponse({
    description: 'Time off request not found',
    type: NotFoundRequestDto,
  })
  @Roles(SYSTEM_ROLES.HR, SYSTEM_ROLES.USER, SYSTEM_ROLES.ADMIN)
  @Get(':id')
  async getTimeOffRequest(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.timeOffRequestsService.getTimeOffRequest(id);
  }
}
