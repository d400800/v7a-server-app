import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto, UserDto } from './dtos/user.dtos';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto, password: string): Promise<User> {
    const createdUser = new this.userModel({ ...createUserDto, password });

    return createdUser.save();
  }

  // Add other methods like find user, update user, delete user etc.
  find() {
    return this.userModel.find().exec();
  }

  async findOne(name: string) {
    return this.userModel.findOne({ name }).exec();
  }

  delete(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  update(id: string, userDto: UserDto) {
    return this.userModel.findOneAndUpdate({ _id: id }, userDto);
  }
}
