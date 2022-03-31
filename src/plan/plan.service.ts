import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlanDocument } from 'src/schemas/plan.schema';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}

  create(plans: Plan[]) {
    return Promise.all(
      plans.map(async (plan) => {
        if (plan.id) await this.planModel.updateOne({ _id: plan.id }, plan).exec();
        else await new this.planModel(plan).save();
      }),
    );
  }

  async findAll(): Promise<Plan[]> {
    return this.planModel.find().exec();
  }

  findOne(id: string): Promise<Plan> {
    return this.planModel.findById(id).exec();
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.planModel.updateOne({ _id: id }, updatePlanDto).exec();
  }

  remove(id: string) {
    return this.planModel.deleteOne({ _id: id }).exec();
  }
}
