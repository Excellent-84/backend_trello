import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { OwnerGuard } from '../users/owner-user.guard';
import { Card } from './cards.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Карточки')
@UseGuards(JwtAuthGuard)
@Controller('users/:userId/columns/:columnId/cards')
export class CardsController {

	constructor(private readonly cardsService: CardsService) {}

	@ApiOperation({ summary: 'Создать новую карточку' })
  @ApiResponse({ status: 201, type: Card })
  @UseGuards(OwnerGuard)
  @Post()
  async create(@Param('columnId') columnId: number, @Body() dto: CreateCardDto): Promise<Card> {
    return this.cardsService.createCard(columnId, dto);
  }

  @ApiOperation({ summary: 'Получить все карточки' })
  @ApiResponse({ status: 200, type: [Card] })
  @UseGuards(OwnerGuard)
  @Get()
  async findAll(@Param('columnId') columnId: number): Promise<Card[]> {
    return this.cardsService.getCards(columnId);
  }

  @ApiOperation({ summary: 'Получить карточку по id' })
  @ApiResponse({ status: 200, type: Card })
  @UseGuards(OwnerGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Card> {
    return this.cardsService.getCardById(id);
  }

  @ApiOperation({ summary: 'Обновить карточку' })
  @ApiResponse({ status: 200, type: Card })
  @UseGuards(OwnerGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCardDto): Promise<Card> {
    return this.cardsService.updateCard(id, dto);
  }

  @ApiOperation({ summary: 'Удалить карточку' })
  @HttpCode(204)
  @UseGuards(OwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.cardsService.deleteCard(id);
  }
}
