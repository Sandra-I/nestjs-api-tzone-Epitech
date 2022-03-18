import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(user: { firstName: string, lastName: string, email: string }) {
    const userCount = await this.userModel.count().exec();
    const newUser = new this.userModel(user);
    newUser.isAdmin = !userCount;
    await newUser.save();
    return newUser;
  }

  findAll(filter?: User) {
    return `This action returns all user`;
  }

  findOne(id: string): Promise<UserDocument> {
    /** @Todo - Middleware Authentification */
    return this.userModel.findById(id).exec();
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
        annual: updateUserDto.annual
      })
    }
    return this.userModel.updateOne({ _id: user.id }, user);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
