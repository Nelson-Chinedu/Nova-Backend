import {
  Controller,
  Post,
  Body,
  UsePipes,
  Req,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import {
  CreateCandidateDto,
  CreateCandidateResponse,
} from './dto/create-candidate.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CreateDecorator } from 'src/common/decorators/swagger.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { SYSTEM_ROLES } from 'src/common/constant/system-roles';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

interface IReq {
  user: {
    sub: string;
  };
}

export interface IPayload {
  firstname: string;
  lastname: string;
  email: string;
  social: string;
  url: string;
  pipeline_stage: string;
}

@ApiCookieAuth()
@ApiTags('Candidates')
@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @CreateDecorator({
    summary: 'Add new candidate to a recruitment',
    description: 'Candidate added successfully',
    type: CreateCandidateResponse,
  })
  @Roles(SYSTEM_ROLES.HR, SYSTEM_ROLES.ADMIN)
  @UsePipes(new ValidationPipe())
  @Post(':recruitmentId')
  async create(
    @Param('recruitmentId', new ParseUUIDPipe()) recruitmentId: string,
    @Body() createCandiidateDto: CreateCandidateDto,
    @Req() req: IReq,
  ) {
    const payload = {
      ...createCandiidateDto,
    };
    const params = {
      recruitmentId,
      userId: req.user.sub,
    };
    return await this.candidateService.create({ payload, params });
  }
}
