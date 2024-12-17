import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Заголовок должен быть строкой' })
  @IsNotEmpty({ message: 'Заголовок не должен быть пустым' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;
}
