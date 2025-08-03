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
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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
import { RecruitmentService } from './recruitment.service';
import {
  CreateRecruitmentDto,
  PaginatedRecruitmentResponse,
} from './dto/recruitment.dto';

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
  @ApiOkResponse({ description: 'Okk' })
  @ApiNotFoundResponse({
    description: 'Recruitment with id not found',
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getRecruitment(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.recruitmentService.getRecruitment(id);
  }

  @ApiOperation({ summary: 'Get all recruitments' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({
    type: PaginatedRecruitmentResponse,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  async getRecruitments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number,
    @Req() req: IReq,
  ) {
    const userId = req.user.sub;
    return this.recruitmentService.getRecruitments(page, limit, userId);
  }
}
