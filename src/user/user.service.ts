import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from 'src/payment/entities/payment.entity';
import { Plan } from 'src/plan/entities/plan.entity';
import { UserDocument } from 'src/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: { firstName: string; lastName: string; email: string }) {
    const userCount = await this.userModel.count().exec();
    const newUser = new this.userModel(user);
    newUser.isAdmin = !userCount;
    await newUser.save();
    return newUser;
  }

  findAll(filter?: User) {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<any> {
    /** @Todo - Middleware Authentification */
    return this.userModel.findById(id).populate('payment').lean().exec();
  }

  findWithEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.subscription[user.subscription.length].endDate = new Date();
    if (updateUserDto.planId) {
      user.subscription.push({
        planId: updateUserDto.planId,
        startDate: new Date(),
        annual: updateUserDto.annual,
      });
    }
    return this.userModel.updateOne({ _id: user.id }, user);
  }

  async updateHistory(history: User['history'][number], user: User) {
    const userData = await this.userModel.findById(user.id).exec();
    userData.history.push({ ...history, date: new Date() });
    if (userData.history.length > 20) {
      userData.history.splice(0, 1);
    }
    return userData.save();
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async addSubscription(plan: Plan, annual: boolean, userId: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    user.subscription.push({
      planId: plan.id,
      startDate: new Date(),
      annual,
    });
    await user.save();
  }

  public async cancelSubscription(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId).exec();
    if (!user.subscription[user.subscription.length - 1].endDate) {
      user.subscription[user.subscription.length - 1].endDate = new Date();
    }
    user.save();
  }

  public getSubscriptionFromPayment(user: User, payment: Payment): User['subscription'][number] {
    const paymentDate = new Date(payment.date).getTime();
    for (const subscription of user.subscription) {
      const start = new Date(subscription.startDate).getTime();
      const end = subscription.endDate && new Date(subscription.endDate).getTime();
      if (start < paymentDate && (!end || end > paymentDate)) {
        return subscription;
      }
    }
  }
}
