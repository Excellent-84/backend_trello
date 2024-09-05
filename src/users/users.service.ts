import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const [newUser] = await this.userRepository.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING * ',
      [dto.email, dto.password]
    );
    return newUser;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.query(
      'SELECT * FROM users'
    )
    return users;
  }

  async getUserById(id: number): Promise<User> {
    const [user] = await this.userRepository.query(
      'SELECT * FROM users WHERE id = $1', [id]
    );

    if (!user) {
      throw new NotFoundException('Пользователь не найден')
    }

    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const [updateUser] = await this.userRepository.query(
      'UPDATE users SET password = $1 WHERE id = $2 RETURNING * ',
      [hashedPassword, id]
    );
    return updateUser[0];
  }

  async deleteUser(id: number): Promise<void> {
    await this.getUserById(id)
    await this.userRepository.query(
      'DELETE FROM users WHERE id = $1', [id]
    );
  }

  async getUserByEmail(email: string): Promise<User> {
    const [user] = await this.userRepository.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    return user;
  }
}
