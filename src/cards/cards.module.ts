import { forwardRef, Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnName } from '../columns/columns.entity';
import { Comment } from '../comments/comments.entity';
import { Card } from './cards.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.entity';
import { ColumnsService } from '../columns/columns.service';
import { UsersService } from '../users/users.service';
import { CommentsService } from '../comments/comments.service';

@Module({
  providers: [CardsService, ColumnsService, UsersService, CommentsService],
  controllers: [CardsController],
  imports: [
    TypeOrmModule.forFeature([User, ColumnName, Card, Comment]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CardsService
  ]
})
export class CardsModule {}
