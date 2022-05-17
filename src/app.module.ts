import {
  Module,
  CacheModule,
  CacheInterceptor,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './books/books.module';
import { RedisModule } from 'nestjs-redis';
import * as redisStore from 'cache-manager-redis-store';
import { LoggingMiddleware } from './security/verifyUser';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'h#p!00à@mo=$^ù',
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register({
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      ttl: 800,
      max: 1000,
      isGlobal: true,
    }),
    AuthModule,
    BookModule,
    OrdersModule,
    MongooseModule.forRoot(
      'mongodb+srv://aminenest:09Q3aiLnKlcmOqJ2@cluster0.ahi3o.mongodb.net/nestProjectDataBase?retryWrites=true&w=majority',
    ),
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('/books');
  }
}
