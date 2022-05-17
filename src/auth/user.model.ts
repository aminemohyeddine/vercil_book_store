import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

export interface UserI {
  userName: string;
  password: string;
  phoneNumber: string;
  email: string;
  isAdmin: Boolean;
}
