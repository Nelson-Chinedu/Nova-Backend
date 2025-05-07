import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { TimeOffRequestsService } from './time-off-request.service';

import {
  CreateTimeOffDto,
  CreateTimeOffResponse,
} from './dto/create-time-off.dto';

import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { Roles } from '../../common/decorators/roles.decorator';

import { SYSTEM_ROLES } from '../../common/constant/system-roles';

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
  @ApiOperation({ summary: 'Create time off requests' })
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
    const payload: IPayload = {
      ...createTimeOff,
      userId: req.user.sub,
    };
    return this.timeOffRequestsService.createTimeOff(payload);
  }
}
