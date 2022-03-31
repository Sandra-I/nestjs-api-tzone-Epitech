import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PlanModule } from 'src/plan/plan.module';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment } from './entities/payment.entity';
import { PaymentSchema } from 'src/schemas/payment.schema';

@Module({
  controllers: [PaymentController],
  imports: [PlanModule, UserModule, MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
