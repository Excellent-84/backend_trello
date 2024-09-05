import { ApiProperty } from "@nestjs/swagger";
import { Columns } from "../columns/columns.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cards')
export class Card {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Card title', description: 'Название карточки' })
  @Column('varchar', { length: 50 })
  title!: string;

  @ApiProperty({ example: 'Card description', description: 'Описание карточки' })
  @Column('varchar', { nullable: true, length: 255 })
  description?: string;

  @ManyToOne(() => Columns, (column) => column.cards, { onDelete: 'CASCADE'})
  column: Columns;
}