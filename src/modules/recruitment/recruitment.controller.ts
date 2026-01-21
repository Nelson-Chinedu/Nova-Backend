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
import { AddCandidateDto, AddCandidateResponse } from './dto/add-candidate.dto';
import { CreateDecorator } from 'src/common/decorators/swagger.decorator';
import { PaginatedCandidateResponse } from './dto/get-candidates.dto';

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

export interface IAddPayload {
  firstname: string;
  lastname: string;
  email: string;
  social: string;
  url: string;
  pipeline_stage: string;
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

  @CreateDecorator({
    summary: 'Add new candidate to a recruitment',
    description: 'Candidate added successfully',
    type: AddCandidateResponse,
  })
  @Roles(SYSTEM_ROLES.HR, SYSTEM_ROLES.ADMIN)
  @UsePipes(new ValidationPipe())
  @Post(':recruitmentId/candidates')
  async addCandidate(
    @Param('recruitmentId', new ParseUUIDPipe()) recruitmentId: string,
    @Body() createCandiidateDto: AddCandidateDto,
    @Req() req: IReq,
  ) {
    const payload = {
      ...createCandiidateDto,
    };
    const params = {
      recruitmentId,
      userId: req.user.sub,
    };
    return await this.recruitmentService.addCandidate({ payload, params });
  }

  @ApiOperation({ summary: 'Get all candidates to a recruitment' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ type: PaginatedCandidateResponse })
  @Get(':recruitmentId/candidates')
  getCandidates(
    @Param('recruitmentId', new ParseUUIDPipe()) recruitmentId: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.recruitmentService.getCandidates(page, limit, recruitmentId);
  }
}
