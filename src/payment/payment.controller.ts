/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, UseGuards, Post, Param, Body, Req, Get, Res } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PaymentService } from './payment.service';
import { PlanService } from 'src/plan/plan.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { generateInvoicePDF } from 'src/etc/generatePDF';

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
  @ApiParam({
    type: `string`,
    name: 'planId',
  })
  @ApiParam({
    type: `boolean`,
    name: 'annual',
  })
  async initPayment(@Body('planId') planId: string, @Body('annual') annual: boolean) {
    const plan = await this.planService.findOne(planId);
    const amount = annual ? plan.annuelPrice : plan.price;
    return this.stripeService.initPayment(amount * 100);
  }

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({
    type: `string`,
    name: 'planId',
  })
  @ApiParam({
    type: `boolean`,
    name: 'annual',
  })
  async AddPayment(@Body('planId') planId: string, @Body('annual') annual: boolean, @Req() req) {
    const plan = await this.planService.findOne(planId);
    await this.userService.addSubscription(plan, annual, req.user.id);
    this.stripeService.newPayment(req.user.id);
  }

  @Get('invoice/:id')
  @UseGuards(AuthGuard('jwt'))
  async getInvoice(@Req() req, @Res() res, @Param('id') id: string) {
    const user = (await this.userService.findOne(req.user.id)) as User;
    const payment = user.payment.find((current) => current._id.toString() == id);
    if (payment) {
      /** @ts-ignore */
      const subscription = this.userService.getSubscriptionFromPayment(user, payment);
      const plan = await this.planService.findOne(subscription.planId);
      res.set('Content-type', 'application/pdf');
      /** @ts-ignore */
      const stream = await generateInvoicePDF(user, payment, plan, subscription);
      stream.pipe(res);
    } else {
      return { status: 403 };
    }
  }
}
