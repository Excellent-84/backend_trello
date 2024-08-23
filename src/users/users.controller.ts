import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  async findAll() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
