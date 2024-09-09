import { Injectable, NotFoundException } from '@nestjs/common';
import { Columns } from './columns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnsService {

  constructor(
    @InjectRepository(Columns) private readonly columnRepository: Repository<Columns>
  ) {}

  async createColumn(userId: number, dto: CreateColumnDto): Promise<Columns> {
    const [newColumn] = await this.columnRepository.query(
      `INSERT INTO columns (title, "userId") VALUES ($1, $2) RETURNING * `,
      [dto.title, userId]
    );
    return newColumn;
  }

  async getColumns(userId: number): Promise<Columns[]> {
    const columns = await this.columnRepository.query(
      `SELECT col.id AS column_id,
              col.title AS column_title,
              col."userId" AS user_id,
              car.id AS card_id,
              car.title AS card_title,
              COUNT(com.id) AS comment_count
      FROM columns col
      JOIN cards car ON car."columnId" = col.id
      LEFT JOIN comments com ON com."cardId" = car.id
      WHERE col."userId" = $1
      GROUP BY col.id, car.id
      ORDER BY col.id, car.id`,
      [userId]
    );

    return columns.map(column => ({
      id: column.column_id,
      title: column.column_title,
      user: { id: column.user_id },
      cards: [{
        id: column.card_id,
        title: column.card_title,
        commentCount: column.comment_count
      }]
    }));
  }

  async getColumnById(id: number): Promise<Columns> {
    const [column] = await this.columnRepository.query(
      `SELECT * FROM columns WHERE id = $1`,
      [id]
    );

    if (!column) {
      throw new NotFoundException('Колонка не найдена');
    }

    return {...column, user: { id: column.userId }};
  }

  async updateColumn(id: number, dto: UpdateColumnDto): Promise<Columns> {
    await this.getColumnById(id);

    const [updateColumn] = await this.columnRepository.query(
      'UPDATE columns SET title = $1 WHERE id = $2 RETURNING * ',
      [dto.title, id]
    );
    return updateColumn[0];
  }

  async deleteColumn(id: number): Promise<void> {
    await this.getColumnById(id)

    await this.columnRepository.query(
      'DELETE FROM columns WHERE id = $1', [id]
    );
  }
}
