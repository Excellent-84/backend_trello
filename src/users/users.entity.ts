import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
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
}
