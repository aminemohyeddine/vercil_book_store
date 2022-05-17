import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  pagesNumber: { type: Number, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  language: { type: String, required: true },
  description: { type: String, required: true },
});

export interface BookI {
  name: string;
  image: string;
  pagesNumber: number;
  rating: number;
  price: number;
  currency: string;
  category: string;
  author: string;
  language: string;
  description: string;
}
