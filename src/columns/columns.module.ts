import { forwardRef, Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { Columns } from './columns.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ColumnsService, UsersService],
  controllers: [ColumnsController],
  imports: [
    TypeOrmModule.forFeature([User, Columns]),
    forwardRef(() => AuthModule)
  ],
  exports: [
    ColumnsService,
    UsersService
  ]
})
export class ColumnsModule {}
