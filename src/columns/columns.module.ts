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
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/comments.entity';

@Module({
  providers: [ColumnsService, UsersService, CardsService, CommentsService],
  controllers: [ColumnsController],
  imports: [
    TypeOrmModule.forFeature([User, Columns, Card, Comment]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    ColumnsService
  ]
})
export class ColumnsModule {}
