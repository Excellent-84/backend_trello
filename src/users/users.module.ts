import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { Columns } from '../columns/columns.entity';
import { ColumnsService } from '../columns/columns.service';
import { Card } from '../cards/cards.entity';
import { CardsService } from '../cards/cards.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ColumnsService, CardsService],
  imports: [
    TypeOrmModule.forFeature([User, Columns, Card]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
