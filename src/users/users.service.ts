import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

   constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(dto);
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (err) {
      throw err;
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        return null;
      }
      this.userRepository.merge(user, dto);
      await this.userRepository.save(user);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      return (result.affected ?? 0) > 0;
    } catch (err) {
      throw err;
    }
  }
}
