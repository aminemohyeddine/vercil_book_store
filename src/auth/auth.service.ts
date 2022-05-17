import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserI } from './user.model';
const bcrypt = require('bcrypt');
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Users') private readonly userModel: Model<UserI>,
  ) {}

  async insertUser(
    userName: string,
    password: string,
    phoneNumber: string,
    email: string,
    isAdmin: boolean,
  ) {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //check if user found
    const user = await this.userModel.findOne({
      userName: userName,
    });
    if (user === null) {
      const newUser = new this.userModel({
        userName,
        password: hashedPassword,
        phoneNumber,
        email,
        isAdmin,
      });
      await newUser.save();
      return 'user created';
    } else {
      return 'userName taken';
    }
  }

  async login(userName, password, response) {
    const saltRounds = 10;

    const user = await this.userModel.findOne({
      userName: userName,
    });

    let hash;

    if (user === null) {
      return 'no user found';
    } else {
      hash = user.password;
    }

    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) return 'invalid password';
    const token = await this.jwtService.signAsync({ _id: user._id });
    //create & asign a token

    // const token = Jwt.sign({ _id: user._id }, 'jukiç_é=!:/');
    response.cookie('token', token, { httpOnly: true });

    response.set('Authorization', 'Bearer ' + token);

    response.send({
      success: true,
      token,
      _id: user._id,
      user: user,
    });
  }

  async adminsignin(userName, password, isAdmin, response) {
    const saltRounds = 10;

    const user = await this.userModel.findOne({
      userName: userName,
      isAdmin: isAdmin,
    });

    let hash;

    if (user === null) {
      return 'no user found';
    } else {
      hash = user.password;
    }

    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) return 'invalid password';
    const token = await this.jwtService.signAsync({ _id: user._id });
    //create & asign a token

    // const token = Jwt.sign({ _id: user._id }, 'jukiç_é=!:/');
    response.cookie('token', token, { httpOnly: true });

    response.set('Authorization', 'Bearer ' + token);

    response.send({
      success: true,
      token,
      _id: user._id,
    });
  }

  async checkUserToken(token, response) {
    const reqResp = await this.jwtService.verify(token);
    const user = await this.userModel.findOne({
      _id: reqResp._id,
    });

    if (reqResp._id) {
      return {
        login: 'success',
        tokenData: reqResp,
        user: user,
      };
    }

    // response.send({
    //   success: true,
    //   token,
    //   _id: user._id,
    // });
  }
}

//
