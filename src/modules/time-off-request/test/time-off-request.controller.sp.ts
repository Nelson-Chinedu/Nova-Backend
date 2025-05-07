import { Test, TestingModule } from '@nestjs/testing';

import { TimeoffRequestsController } from '../time-off-request.controller';
import { TimeOffRequestsService } from '../time-off-request.service';

import {
  responseStub,
  timeOffRequestStub,
} from './stubs/time-off-request.stub';

interface IReq {
  user: {
    sub: string;
  };
}

const mockRequest = (): IReq => ({
  user: {
    sub: '0c4df51f-3b30-42e2-b665-c38e16219cb5',
  },
});

jest.mock('../time-off-request.service');

describe('timeOffRequestsController', () => {
  let timeOffRequestsController: TimeoffRequestsController;
  let timeOffRequestsService: TimeOffRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeoffRequestsController],
      providers: [TimeOffRequestsService],
    }).compile();

    timeOffRequestsController = module.get<TimeoffRequestsController>(
      TimeoffRequestsController,
    );
    timeOffRequestsService = module.get<TimeOffRequestsService>(
      TimeOffRequestsService,
    );
    jest.clearAllMocks();
  });

  test('it should be defined', () => {
    expect(timeOffRequestsController).toBeDefined();
  });

  describe('create time of requests', () => {
    describe('when createTimeOff is called', () => {
      test('then it should call timeOffRequestsService', async () => {
        const req = mockRequest();

        const result = await timeOffRequestsController.createTimeOff(
          timeOffRequestStub(),
          req,
        );
        expect(timeOffRequestsService.createTimeOff).toHaveBeenCalledWith(
          timeOffRequestStub(),
        );
        expect(result).toEqual(responseStub());
      });
    });
  });
});
