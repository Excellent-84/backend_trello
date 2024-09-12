import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CardsService } from '../cards/cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from '../cards/cards.entity';
import { User } from '../users/users.entity';
import { ColumnName } from '../columns/columns.entity';
import { Comment } from './comments.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from '../users/users.service';
import { ColumnsService } from '../columns/columns.service';

@Module({
  providers: [UsersService, ColumnsService, CommentsService, CardsService],
  controllers: [CommentsController],
  imports: [
    TypeOrmModule.forFeature([User, ColumnName, Card, Comment]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    CommentsService
  ]
})
export class CommentsModule {}
