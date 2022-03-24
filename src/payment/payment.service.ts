import { Get, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

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
}
