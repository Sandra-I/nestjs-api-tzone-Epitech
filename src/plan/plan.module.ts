import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan } from './entities/plan.entity';
import { PlanSchema } from 'src/schemas/plan.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Plan.name, schema: PlanSchema}])],
  controllers: [PlanController],
  providers: [PlanService]
})
export class PlanModule {}
