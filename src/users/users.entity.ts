import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ColumnName } from '../columns/columns.entity';

@Entity('users')
export class User {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ example: 'john@example.com', description: 'Почтовый адрес' })
  @Column('varchar', { unique: true, length: 50 })
  email!: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Exclude()
  @Column('varchar', { length: 255 })
  password!: string;

  @OneToMany(() => ColumnName, (column) => column.user, { cascade: true })
  columns: ColumnName[];
}
