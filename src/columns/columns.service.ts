import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Columns } from './columns.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';

@Injectable()
export class ColumnsService {

  constructor(
    @InjectRepository(Columns)private readonly columnRepository: Repository<Columns>
  ) {}

  async createColumn(userId: number, dto: CreateColumnDto): Promise<Columns> {
    const [newColumn] = await this.columnRepository.query(
      'INSERT INTO columns (title, "userId") VALUES ($1, $2) RETURNING * ',
      [dto.title, userId]
    );
    return newColumn;
  }

  async getColumns(): Promise<Columns[]> {
    const columns = await this.columnRepository.query(
      'SELECT * FROM columns'
    )
    return columns;
  }

  async getColumnById(id: number): Promise<Columns> {
    const [column] = await this.columnRepository.query(
      'SELECT * FROM columns WHERE id = $1', [id]
    );

    if (!column) {
      throw new HttpException('Колонка не найдена', HttpStatus.NOT_FOUND)
    }

    return column;
  }

  async updateColumn(id: number, dto: CreateColumnDto): Promise<Columns> {
    await this.getColumnById(id)

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
