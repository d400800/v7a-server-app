import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/is-public.decorator';
import { CreateUserDto, UserDto, DeleteUserDto } from './dtos/user.dtos';
import { Admin } from '../auth/is-admin.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UserDto[]> {
    return this.usersService.getAllUsers();
  }

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto): Promise<number> {
    return this.usersService.create(createUserDto);
  }

  @Delete()
  async delete(@Body() deleteUserDto: DeleteUserDto) {
    return this.usersService.delete(deleteUserDto);
  }

  @Admin()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto) {
    if (!id) {
      throw new BadRequestException('Id is not specified');
    }

    return this.usersService.update(id, userDto);
  }
}
