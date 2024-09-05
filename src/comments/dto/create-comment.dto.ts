import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCommentDto {

  @ApiProperty({ example: 'Comment content', description: 'Текст комментария' })
  @IsString({ message: 'Должно быть строкой' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым' })
  @MaxLength(800, { message: 'Комментарий не должно превышать 800 символов' })
  readonly content: string;
}
