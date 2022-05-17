import {
  Controller,
  Post,
  Res,
  Req,
  Body,
  Get,
  UnauthorizedException,
  CACHE_MANAGER,
  Inject,
  CacheInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { OrdersService } from './orders.service';
import { OrdersSchema } from './orders.model';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private OrdersService: OrdersService,
    private jwtService: JwtService,
  ) {}

  @Post('add')
  public async addBook(
    @Body('books') books: [string],
    @Body('phoneNumber') phoneNumber: string,
    @Body('address') address: string,
    @Body('email') email: string,
    @Body('total') total: number,
    @Body('currency') currency: string,
    @Body('userCompleteName') userCompleteName: string,
  ) {
    return this.OrdersService.addOrder(
      books,
      phoneNumber,
      address,
      email,
      total,
      currency,
      userCompleteName,
    );
  }
}
