import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdateUserDto {

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(8, 16, { message: 'Не меньше 8 и не больше 16 символов' })
  readonly password: string;
}
