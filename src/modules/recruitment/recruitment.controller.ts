import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  UsePipes,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/recruitment.dto';

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
  job_title: string;
  job_type: string;
  department: string;
  location: string;
  description: string;
  about_company: string;
  active_until: string;
}

@ApiCookieAuth()
@ApiTags('Recruitments')
@Controller('recruitments')
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @ApiOperation({ summary: 'Create new recruitment' })
  @ApiCreatedResponse({
    description: 'Recruitment  created successfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad payload',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(HttpStatus.CREATED)
  @Roles(SYSTEM_ROLES.HR, SYSTEM_ROLES.ADMIN)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(
    @Body() createRecruitmentDto: CreateRecruitmentDto,
    @Req() req: IReq,
  ) {
    const payload: IPayload = {
      ...createRecruitmentDto,
      userId: req.user.sub,
    };
    return this.recruitmentService.create(payload);
  }

  @ApiOperation({ summary: 'Get single recruitment' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({
    description: 'Recruitment with id not found',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRecruitments(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recruitmentService.getRecruitments(id);
  }
}
