import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Columns } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OwnerGuard } from '../users/owner-user.guard';

@ApiTags('Колонки')
@UseGuards(JwtAuthGuard, OwnerGuard)
@Controller('users/:id/columns')
export class ColumnsController {

	constructor(private readonly columnService: ColumnsService) {}

	@ApiOperation({ summary: 'Создать новую колонку' })
  @ApiResponse({ status: 201, type: Columns })
  @Post()
  async create(@Param('id') userId: number, @Body() dto: CreateColumnDto): Promise<Columns> {
    return this.columnService.createColumn(userId, dto);
  }

  @ApiOperation({ summary: 'Получить все колонки' })
  @ApiResponse({ status: 200, type: [Columns] })
  @Get()
  async findAll(): Promise<Columns[]> {
    return this.columnService.getColumns();
  }

  @ApiOperation({ summary: 'Получить колонку по id' })
  @ApiResponse({ status: 200, type: Columns })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Columns> {
    return this.columnService.getColumnById(id);
  }

  @ApiOperation({ summary: 'Обновить колонку' })
  @ApiResponse({ status: 200, type: Columns })
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: CreateColumnDto): Promise<Columns> {
    return this.columnService.updateColumn(id, dto);
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.columnService.deleteColumn(id);
  }
}
