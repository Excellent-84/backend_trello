import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnName } from './columns.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ColumnGuard } from '../guards/column.guard';
import { UserGuard } from '../guards/user.guard';
import { UpdateColumnDto } from './dto/update-column.dto';

@ApiTags('Колонки')
@UseGuards(JwtAuthGuard, UserGuard)
@UsePipes(ParseIntPipe)
@Controller('users/:userId/columns')
export class ColumnsController {

	constructor(private readonly columnService: ColumnsService) {}

	@ApiOperation({ summary: 'Создать новую колонку' })
  @ApiResponse({ status: 201, type: ColumnName })
  @Post()
  async create(@Param('userId') userId: number, @Body() dto: CreateColumnDto): Promise<ColumnName> {
    return this.columnService.createColumn(userId, dto);
  }

  @ApiOperation({ summary: 'Получить все колонки' })
  @ApiResponse({ status: 200, type: [ColumnName] })
  @Get()
  async findAll(@Param('userId') userId: number): Promise<ColumnName[]> {
    return this.columnService.getColumns(userId);
  }

  @ApiOperation({ summary: 'Получить колонку по id' })
  @ApiResponse({ status: 200, type: ColumnName })
  @UseGuards(ColumnGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ColumnName> {
    return this.columnService.getColumnById(id);
  }

  @ApiOperation({ summary: 'Обновить колонку' })
  @ApiResponse({ status: 200, type: ColumnName })
  @UseGuards(ColumnGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateColumnDto): Promise<ColumnName> {
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
