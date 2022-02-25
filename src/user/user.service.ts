import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlanService } from 'src/plan/plan.service';
import { UserDocument } from 'src/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  create(user: {firstName: string, lastName: string, email: string}) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  findAll(filter?: User) {
    return `This action returns all user`;
  }

  findOne(id: string): Promise<UserDocument> {
    /** @Todo - Middleware Authentification */
    return this.userModel.findById(id).exec();
  }

  findWithGoogleId(id: string): Promise<UserDocument> {
    return this.userModel.findOne({ googleId: id}).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.subscription[user.subscription.length].endDate = new Date();
    if (updateUserDto.planId) {
      user.subscription.push({
        planId: updateUserDto.planId,
        startDate: new Date(),
        annual: updateUserDto.annual
      })
    }
    return this.userModel.updateOne({ _id: user.id }, user);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
