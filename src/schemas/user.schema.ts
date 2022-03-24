import * as mongoose from 'mongoose';
import { User } from 'src/user/entities/user.entity';

export type UserDocument = User & Document;

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  isAdmin: Boolean,
  history: [
    {
      text: String,
      translation: {
        lang: String,
        text: String,
      },
      date: Date,
    },
  ],
  settings: {
    langage: String,
    preview: Boolean,
  },
  payment: [
    {
      date: Date,
      total: Number,
    },
  ],
  subscription: [
    {
      planId: {
        type: mongoose.Types.ObjectId,
        ref: 'Plan',
      },
      startDate: Date,
      endDate: Date,
      annual: Boolean,
    },
  ],
});
