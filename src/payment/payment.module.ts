import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PlanModule } from 'src/plan/plan.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [PaymentController],
  imports: [PlanModule, UserModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
