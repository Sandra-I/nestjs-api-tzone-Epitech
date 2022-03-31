import * as mongoose from 'mongoose';
import { Plan } from 'src/plan/entities/plan.entity';

export type PlanDocument = Plan & Document;

export const PlanSchema = new mongoose.Schema({
  name: String,
  capture: Boolean,
  preview: Boolean,
  quickCapture: Boolean,
  fontRecuperation: Boolean,
  history: Boolean,
  translation: Boolean,
  hidden: Boolean,
  price: Number,
  annuelPrice: Number,
  color: String,
});
