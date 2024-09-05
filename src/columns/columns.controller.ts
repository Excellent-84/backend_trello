import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Columns } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ColumnGuard } from '../guards/column.guard';
import { UserGuard } from '../guards/user.guard';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Колонки')
@UseGuards(JwtAuthGuard, UserGuard)
@Controller('users/:userId/columns')
export class ColumnsController {

	constructor(private readonly columnService: ColumnsService) {}

	@ApiOperation({ summary: 'Создать новую колонку' })
  @ApiResponse({ status: 201, type: Columns })
  @Post()
  async create(@Param('userId') userId: number, @Body() dto: CreateColumnDto): Promise<Columns> {
    return this.columnService.createColumn(userId, dto);
  }

  @ApiOperation({ summary: 'Получить все колонки' })
  @ApiResponse({ status: 200, type: [Columns] })
  @Get()
  async findAll(@Param('userId') userId: number): Promise<Columns[]> {
    return this.columnService.getColumns(userId);
  }

  @ApiOperation({ summary: 'Получить колонку по id' })
  @ApiResponse({ status: 200, type: Columns })
  @UseGuards(ColumnGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Columns> {
    return this.columnService.getColumnById(id);
  }

  @ApiOperation({ summary: 'Обновить колонку' })
  @ApiResponse({ status: 200, type: Columns })
  @UseGuards(ColumnGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateColumnDto): Promise<Columns> {
    return this.columnService.updateColumn(id, dto);
  }

  @ApiOperation({ summary: 'Удалить колонку' })
  @HttpCode(204)
  @UseGuards(ColumnGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.columnService.deleteColumn(id);
  }
}
