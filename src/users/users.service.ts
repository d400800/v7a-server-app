import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CreateUserDto, DeleteUserDto, UserDto } from './dtos/user.dtos';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOne(username: string): Promise<User | undefined> {
    return (await this.userRepository.findOne(username)).toObject();
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      id: user._id,
      companyId: user.companyId,
    }));
  }

  async create(createUserDto: CreateUserDto) {
    const randomPassword = crypto.randomBytes(16).toString('hex');
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const user = await this.userRepository.create(
      createUserDto,
      hashedPassword,
    );

    console.log(randomPassword);

    return user._id;
  }

  async update(id: string, userDto: UserDto) {
    if (userDto.password !== undefined) {
      userDto.password = await bcrypt.hash(userDto.password, 10);
    }

    return this.userRepository.update(id, userDto);
  }

  async delete(deleteUserDto: DeleteUserDto) {
    return this.userRepository.delete(deleteUserDto.id);
  }
}
