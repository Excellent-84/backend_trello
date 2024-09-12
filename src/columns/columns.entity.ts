import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "../cards/cards.entity";

@Entity('columns')
export class ColumnName {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Column title', description: 'Название колонки' })
  @Column('varchar', { length: 50 })
  title!: string;

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE'})
  user: User;

  @OneToMany(() => Card, (card) => card.column, { cascade: true })
  cards: Card[];
}
