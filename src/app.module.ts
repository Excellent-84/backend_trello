import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { ColumnsModule } from './columns/columns.module';
import { Columns } from './columns/columns.entity';
import { Comment } from './comments/comments.entity';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/cards.entity';
import { CommentsModule } from './comments/comments.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Columns, Card, Comment],
      synchronize: true
    }),
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule
  ],
})
export class AppModule {}
