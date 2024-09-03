import { forwardRef, Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Columns } from '../columns/columns.entity';
import { Card } from './cards.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.entity';
import { ColumnsService } from '../columns/columns.service';
import { UsersService } from '../users/users.service';

@Module({
  providers: [CardsService, ColumnsService, UsersService],
  controllers: [CardsController],
  imports: [
    TypeOrmModule.forFeature([User, Columns, Card]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CardsService
  ]
})
export class CardsModule {}
