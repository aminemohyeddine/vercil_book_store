import {
  Controller,
  Post,
  Res,
  Req,
  Body,
  Get,
  UnauthorizedException,
  Injectable,
  Inject,
  CacheInterceptor,
  CACHE_MANAGER,
  UseInterceptors,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderI } from './orders.model';
import { Response, Request } from 'express';
import { Cache } from 'cache-manager';

var redisStore = require('cache-manager-redis-store');

@Injectable({})
export class OrdersService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectModel('Orders') private readonly orderModel: Model<OrderI>,
    private jwtService: JwtService,
  ) {}

  async addOrder(
    books: [string],
    phoneNumber: string,
    address: string,
    email: string,
    total: number,
    currency: string,
    userCompleteName: string,
  ) {
    const newOrder = new this.orderModel({
      books,
      phoneNumber,
      address,
      email,
      total,
      currency,
      userCompleteName,
    });

    await newOrder.save();

    // }
    return newOrder;
  }
}
