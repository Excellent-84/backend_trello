import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCardDto {

  @ApiProperty({ example: 'Card title', description: 'Название карточки' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @MaxLength(50, { message: 'Название карточки не должно превышать 50 символов' })
  readonly title: string;

  @ApiProperty({ example: 'Card description', description: 'Описание карточки' })
  @IsString({ message: 'Должно быть строкой' })
  @IsOptional()
  @MaxLength(255, { message: 'Описание карточки не должно превышать 255 символов' })
  readonly description?: string;
}