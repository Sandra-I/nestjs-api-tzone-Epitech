import { Controller, UseGuards, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { StripeService } from './stripe.service';

@ApiTags('Payment')
@Controller('stripe')
export class StripeController {

  constructor(private readonly stripeService: StripeService) { }

  @Post('init-payment')
  @UseGuards(AuthGuard('jwt'))
  initPayment(@Param('amount') amount: number) {
    return this.stripeService.initPayment(amount);
  }

}
