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
import { BooksService } from './books.service';
import { BookSchema } from './books.model';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('books')
export class BooksController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private bookService: BooksService,
    private jwtService: JwtService,
  ) {}

  @Post('add')
  public async addBook(
    @Body('token') token: string,
    @Body('name') name: string,
    @Body('image') image: string,
    @Body('pagesNumber') pagesNumber: number,
    @Body('rating') rating: number,
    @Body('price') price: number,
    @Body('currency') currency: string,
    @Body('category') category: string,
    @Body('author') author: string,
    @Body('language') language: string,
    @Body('description') description: string,
  ) {
    return this.bookService.addBook(
      token,
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
    );
  }

  @Get('allbooks')
  public async getAllBooks(req: Request) {
    return this.bookService.getAllBooks();
  }

  @Get('getbookbyid')
  public async getBookById(@Query('id') _id: string) {
    return this.bookService.getBookById(_id);
  }

  @Post('updatebook')
  public async updatebook(
    @Query('id') _id: string,
    @Body('name') name: string,
    @Body('images') images: [string],
    @Body('pagesNumber') pagesNumber: number,
    @Body('rating') rating: number,
    @Body('price') price: number,
    @Body('currency') currency: string,
    @Body('category') category: string,
    @Body('author') author: string,
    @Body('language') language: string,
  ) {
    return this.bookService.updatebook(
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
    );
  }

  @Post('deleteallbooks')
  public async deleteAllBooks(req: Request) {
    return this.bookService.deleteAllBooks();
  }

  @Post('deletebookbyid')
  public async deleteBookById(@Query('id') _id: string) {
    return this.bookService.deleteBookById(_id);
  }
}
