import * as mongoose from 'mongoose';

export const OrdersSchema = new mongoose.Schema({
  books: [{ type: String, required: true }],
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  total: { type: Number, required: true },
  currency: { type: String, required: true },
  userCompleteName: { type: String, required: true },
});

export interface OrderI {
  books: [string];
  total: number;
  phoneNumber: string;
  address: string;
  email: string;
  currency: string;
  userCompleteName: string;
}
