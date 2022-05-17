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
import { BookI } from './books.model';
import { Response, Request } from 'express';
import { Cache } from 'cache-manager';

var redisStore = require('cache-manager-redis-store');

@Injectable({})
export class BooksService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectModel('Books') private readonly bookModel: Model<BookI>,
    private jwtService: JwtService,
  ) {}

  async addBook(
    token: string,
    name: string,
    image: string,
    pagesNumber: number,
    rating: number,
    price: number,
    currency: string,
    category: string,
    author: string,
    language: string,
    description: string,
  ) {
    const newBook = new this.bookModel({
      name,
      image,
      pagesNumber,
      rating,
      price,
      currency,
      category,
      author,
      language,
      description,
    });

    await newBook.save();

    // }
    return newBook;
  }

  async getAllBooks() {
    const books = await this.bookModel.find({});
    await this.cacheManager.set('allBooks', books);
    const cachedBooks = await this.cacheManager.get('allBooks', books);
    console.log('cachedBooks');

    if (cachedBooks.length > 0) {
      return cachedBooks;
    } else {
      return books;
    }
  }

  async getBookById(_id: string) {
    const book = await this.bookModel.find({ _id: _id });
    await this.cacheManager.set('singlebook', book, {
      ttl: 60,
    });
    const data = await this.cacheManager.get('singlebook');
    return book;
  }

  async deleteAllBooks() {
    const booksDeleted = await this.bookModel.deleteMany();

    return booksDeleted;
  }

  async updatebook(
    _id,
    name,
    images,
    pagesNumber,
    rating,
    price,
    currency,
    category,
    author,
    language,
  ) {
    const bookUpdated = await this.bookModel.updateOne(
      { _id: _id },
      {
        name: name,
        images: images,
        pagesNumber: pagesNumber,
        rating: rating,
        price: price,
        currency: currency,
        category: category,
        author: author,
        language: language,
      },
      { multi: true },
    );

    return bookUpdated;
  }

  async deleteBookById(_id: string) {
    const book = await this.bookModel.findOneAndDelete({ _id: _id });

    return book;
  }
}
