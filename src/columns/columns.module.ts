import { forwardRef, Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Columns } from './columns.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { Card } from '../cards/cards.entity';
import { CardsService } from '../cards/cards.service';

@Module({
  providers: [ColumnsService, UsersService, CardsService],
  controllers: [ColumnsController],
  imports: [
    TypeOrmModule.forFeature([User, Columns, Card]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    ColumnsService
  ]
})
export class ColumnsModule {}
