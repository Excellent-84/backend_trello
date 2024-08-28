import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateColumnDto {

  @ApiProperty({ example: 'Column title', description: 'Название колонки' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @MaxLength(50, { message: 'Название колонки не должно превышать 50 символов' })
  readonly title: string;
}
