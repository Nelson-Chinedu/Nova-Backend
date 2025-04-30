import { ConflictException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from 'src/auth/signup/entities/signup.entity';
import { Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

interface CreateUserRequest extends Request {
  body: {
    email: string;
  };
}

@Injectable()
export class EmailExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async use(req: CreateUserRequest, res: Response, next: NextFunction) {
    const { email } = req.body;
    const existingUser: Account | null = await this.accountRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email address already exist', {
        cause: new Error(),
        description: 'Email address already exist',
      });
    }

    // if email does not exit, allow the request to continue
    next();
  }
}
