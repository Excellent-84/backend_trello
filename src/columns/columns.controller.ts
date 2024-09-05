import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Columns } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnerGuard } from '../users/owner-user.guard';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/users.entity';
import { ColumnGuard } from '../guards/column.guard';
import { UserGuard } from 'src/guards/user.guard';

@ApiTags('Колонки')
@UseGuards(JwtAuthGuard)
@Controller('users/:userId/columns')
export class ColumnsController {

	constructor(private readonly columnService: ColumnsService) {}

	@ApiOperation({ summary: 'Создать новую колонку' })
  @ApiResponse({ status: 201, type: Columns })
  @UseGuards(UserGuard)
  @Post()
  async create(@Param('userId') userId: number, @Body() dto: CreateColumnDto): Promise<Columns> {
    return this.columnService.createColumn(userId, dto);
  }

  @ApiOperation({ summary: 'Получить все колонки' })
  @ApiResponse({ status: 200, type: [Columns] })
  @UseGuards(UserGuard)
  @Get()
  async findAll(@Param('userId') userId: number): Promise<Columns[]> {
    return this.columnService.getColumns(userId);
  }

  @ApiOperation({ summary: 'Получить колонку по id' })
  @ApiResponse({ status: 200, type: Columns })
  @UseGuards(UserGuard, ColumnGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Columns> {
    return this.columnService.getColumnById(id);
  }

  @ApiOperation({ summary: 'Обновить колонку' })
  @ApiResponse({ status: 200, type: Columns })
  @UseGuards(UserGuard, ColumnGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateColumnDto): Promise<Columns> {
    return this.columnService.updateColumn(id, dto);
  }

  @ApiOperation({ summary: 'Удалить колонку' })
  @HttpCode(204)
  @UseGuards(UserGuard, ColumnGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.columnService.deleteColumn(id);
  }
}

// @ApiTags('Колонки')
// @UseGuards(JwtAuthGuard)
// @Controller('users/:userId/columns')
// export class ColumnsController {

//   constructor(private readonly columnService: ColumnsService) {}

//   @Post()
//   async create(@Req() req, @Body() dto: CreateColumnDto): Promise<Columns> {
//     const userId = req.user.id;  // Получаем userId из токена
//     return this.columnService.createColumn(userId, dto);
//   }

//   @Get()
//   async findAll(@Req() req): Promise<Columns[]> {
//     const userId = req.user.id;  // Получаем userId из токена
//     return this.columnService.getColumns(userId);
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: number, @Req() req): Promise<Columns> {
//     const userId = req.user.id;  // Получаем userId из токена
//     const column = await this.columnService.getColumnById(id);

//     // Проверяем, принадлежит ли колонка пользователю
//     if (column.user.id !== userId) {
//       throw new ForbiddenException('У вас нет доступа к этой колонке');
//     }

//     return column;
//   }

//   @Put(':id')
//   async update(@Param('id') id: number, @Body() dto: CreateColumnDto, @Req() req): Promise<Columns> {
//     const userId = req.user.id;  // Получаем userId из токена
//     const column = await this.columnService.getColumnById(id);

//     // Проверяем, принадлежит ли колонка пользователю
//     if (column.user.id !== userId) {
//       throw new ForbiddenException('У вас нет доступа для изменения этой колонки');
//     }

//     return this.columnService.updateColumn(id, dto);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number, @Req() req): Promise<void> {
//     const userId = req.user.id;  // Получаем userId из токена
//     const column = await this.columnService.getColumnById(id);

//     // Проверяем, принадлежит ли колонка пользователю
//     if (column.user.id !== userId) {
//       throw new ForbiddenException('У вас нет доступа для удаления этой колонки');
//     }

//     return this.columnService.deleteColumn(id);
//   }
// }
