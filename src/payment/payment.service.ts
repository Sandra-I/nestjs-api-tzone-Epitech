import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { PlanService } from 'src/plan/plan.service';
import { PaymentDocument } from 'src/schemas/payment.schema';
import { UserDocument } from 'src/schemas/user.schema';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import Stripe from 'stripe';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private planService: PlanService,
    private userService: UserService,
  ) {}

  public async initPayment(amount: number): Promise<any> {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      payment_method_types: ['card'],
      amount,
      currency: 'EUR',
      receipt_email: 'contact@tzone.com',
    });
    if (paymentIntent.client_secret) {
      return {
        code: 200,
        result: {
          clientSecret: paymentIntent.client_secret,
        },
      };
    } else {
      return {
        code: 400,
        result: {
          msg: 'Preparing payment failed, please try again',
        },
      };
    }
  }

  public async newPayment(userId: string) {
    const user = await this.userService.findOne(userId);
    const currentSubscription = user?.subscription.find((sub) => !sub.endDate);
    if (currentSubscription) {
      const billingNumber = await this._genetareInvoiceNumber();
      const plan = await this.planService.findOne(currentSubscription.planId);
      const payment = new this.paymentModel({
        date: new Date(),
        total: currentSubscription.annual ? plan.annuelPrice : plan.price,
        billingNumber,
      });
      await payment.save();
      user.payment.push(payment._id);
      user.save();
    }
  }

  private async _genetareInvoiceNumber(): Promise<string> {
    const lastPayment = await this.paymentModel.findOne().sort({ created_at: -1 }).exec();
    const lastNumber = lastPayment?.invoiceNumber || 'TZ-000000040005';
    const newNumber = `TZ-${(parseInt('1' + lastNumber.substring(3)) + 1).toString().substring(1)}`;
    return newNumber;
  }
}
