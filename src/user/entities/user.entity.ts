import * as mongoose from 'mongoose';
import { Plan } from 'src/plan/entities/plan.entity';

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  history: [
    {
      text: string;
      date: Date;
    },
  ];
  settings: {
    langage: string;
    preview: boolean;
  };
  payment: mongoose.Types.ObjectId[];
  subscription: {
    planId: string;
    plan?: Plan;
    startDate: Date;
    endDate?: Date;
    annual: boolean;
  }[];
}
