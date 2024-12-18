import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, IsString } from 'class-validator';

export class TasksQueryDto {
  @IsOptional()
  @Type(() => Number) // Преобразует строку в число
  @IsInt({ message: 'Параметр "limit" должен быть целым числом' })
  @Min(1, { message: 'Параметр "limit" должен быть больше 0' })
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Параметр "offset" должен быть целым числом' })
  @Min(0, { message: 'Параметр "offset" должен быть неотрицательным числом' })
  offset: number = 0;

  @IsOptional()
  @IsString({ message: 'Параметр "searchQuery" должен быть строкой' })
  searchQuery: string = '';
}
