import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../cards/cards.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comments')
export class Comment {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Comment content', description: 'Текст комментария' })
  @Column('varchar', { length: 800 })
  content!: string;

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  card!: Card;
}
