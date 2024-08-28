import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('columns')
export class Columns {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'Column title', description: 'Название колонки' })
  @Column('varchar', { length: 50 })
  title!: string;

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE'})
  user: User;
}
