import { Injectable, NestMiddleware, Module } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'h#p!00à@mo=$^ù',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [LoggingMiddleware],
})
export class LoggingMiddleware implements NestMiddleware {
  constructor(public jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token;
    let mode;
    if (req.body.token === undefined) {
      token = req.query.token;
    } else {
      token = req.body.token;
    }
    if (req.body.mode === undefined) {
      mode = req.query.mode;
    } else {
      mode = req.body.mode;
    }

    if (mode === 'normal') {
      const aa = await this.jwtService.verify(token);
    }

    next();
  }
}
