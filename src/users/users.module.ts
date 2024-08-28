import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { Columns } from '../columns/columns.entity';
import { ColumnsService } from '../columns/columns.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ColumnsService],
  imports: [
    TypeOrmModule.forFeature([User, Columns]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
    ColumnsService
  ]
})
export class UsersModule {}
