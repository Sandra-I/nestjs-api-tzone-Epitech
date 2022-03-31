import { Controller, UseGuards, Post, Param, Body, Req, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaymentService } from './payment.service';
import { PlanService } from 'src/plan/plan.service';
import { UserService } from 'src/user/user.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly stripeService: PaymentService,
    private readonly planService: PlanService,
    private readonly userService: UserService,
  ) {}

  @Post('init')
  @UseGuards(AuthGuard('jwt'))
  async initPayment(@Body('planId') planId: string, @Body('annual') annual: boolean) {
    const plan = await this.planService.findOne(planId);
    const amount = annual ? plan.annuelPrice : plan.price;
    return this.stripeService.initPayment(amount * 100);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  async AddPayment(@Body('planId') planId: string, @Body('annual') annual: boolean, @Req() req) {
    const plan = await this.planService.findOne(planId);
    await this.userService.addSubscription(plan, annual, req.user.id);
    this.stripeService.newPayment(req.user.id);
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  async test(@Req() req) {
    this.stripeService.newPayment(req.user.id);
  }
}
