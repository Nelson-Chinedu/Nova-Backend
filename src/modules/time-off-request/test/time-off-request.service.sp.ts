import { Test, TestingModule } from '@nestjs/testing';
import { TimeOffRequestsService } from '../time-off-request.service';

jest.mock('../time-off-request.service');

describe('TimeOffRequestsService', () => {
  let service: TimeOffRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeOffRequestsService],
    }).compile();

    service = module.get<TimeOffRequestsService>(TimeOffRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
