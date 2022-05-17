import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './books.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'h#p!00à@mo=$^ù',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: 'Books', schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BookModule {}
