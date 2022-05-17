import {
  Controller,
  Post,
  Res,
  Req,
  Body,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserI } from './user.model';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}
  @Post('signup')
  public async addUser(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('email') email: string,
    @Body('isAdmin') isAdmin: boolean,
  ) {
    return this.authService.insertUser(
      userName,
      password,
      phoneNumber,
      email,
      isAdmin,
    );
  }

  @Post('signin')
  public async getUserByName(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(userName, password, response);
  }

  @Post('adminsignin')
  public async adminsignin(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('isAdmin') isAdmin: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.adminsignin(userName, password, isAdmin, response);
  }

  @Get('user')
  public async user(@Req() request: Request) {
    const cookie = request.cookies['token'];
    try {
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        return 'login to change books';
      }

      return data;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('verifytoken')
  public async checkUserToken(
    @Body('token') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.checkUserToken(token, response);
  }
}
