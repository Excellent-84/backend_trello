import { Injectable, NotFoundException } from '@nestjs/common';
import { Card } from './cards.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {

  constructor(
    @InjectRepository(Card) private readonly cardsRepository: Repository<Card>
  ) {}

  async createCard(dto: CreateCardDto, columnId: number): Promise<Card> {
    const [newCard] = await this.cardsRepository.query(
      `INSERT INTO cards (title, description, "columnId") VALUES ($1, $2, $3) RETURNING * `,
      [dto.title, dto.description, columnId]
    );
    return newCard;
  }

  async getCards(columnId: number): Promise<Card[]> {
    const cards = await this.cardsRepository.query(
      `SELECT * FROM cards WHERE "columnId" = $1`,
      [columnId]
    )
    return cards.map(card => ({ ...card, column: { id: card.columnId } }));
  }

  async getCardById(id: number): Promise<Card> {
    const [card] = await this.cardsRepository.query(
      `SELECT car.*,
              col."userId"
      FROM cards car
      JOIN columns col ON car."columnId" = col.id
      WHERE c.id = $1`,
      [id]
    );

    if (!card) {
      throw new NotFoundException('Карточка не найдена');
    }

    return { ...card,
      column: { id: card.columnId,
        user: { id: card.userId }
      }
    };
  }

  async updateCard(id: number, dto: UpdateCardDto): Promise<Card> {
    await this.getCardById(id);

    const [updateCard] = await this.cardsRepository.query(
      'UPDATE cards SET title = $1, description = $2 WHERE id = $3 RETURNING * ',
      [dto.title, dto.description, id]
    );
    return updateCard[0];
  }

  async deleteCard(id: number): Promise<void> {
    await this.getCardById(id)

    await this.cardsRepository.query(
      'DELETE FROM cards WHERE id = $1', [id]
    );
  }
}
