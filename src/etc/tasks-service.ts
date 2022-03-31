import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentService } from 'src/payment/payment.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(protected userService: UserService, protected paymentService: PaymentService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    const today = new Date();
    const users = await this.userService.findAll();
    for (const user of users) {
      const currentSubscription = user.subscription.find((current) => !current.endDate);
      if (currentSubscription) {
        const subscriptionDate = new Date(currentSubscription.startDate);
        if (
          today.getDay() == subscriptionDate.getDay() &&
          ((!currentSubscription.annual && subscriptionDate.getMonth() !== today.getMonth()) ||
            (currentSubscription.annual &&
              subscriptionDate.getMonth() == today.getMonth() &&
              subscriptionDate.getFullYear() !== today.getFullYear()))
        ) {
          this.paymentService.newPayment(user._id.toString());
        }
      }
    }
  }
}
