import * as mongoose from 'mongoose';
import { Payment } from 'src/payment/entities/payment.entity';

export type PaymentDocument = Payment & Document;

export const PaymentSchema = new mongoose.Schema({
  date: Date,
  total: Number,
  invoiceNumber: String,
});
