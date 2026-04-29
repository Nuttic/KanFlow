import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import {Type, Color} from '../../../db/entities/collection.entity'

export class CreateCollectionDTO {
  @IsEnum(Type)
  type: Type;

  @IsString()
  title: string;

  @IsString()
  description: string; // Исправлена опечатка

  @IsEnum(Color)
  color: Color

  @IsOptional() // Позволяет полю быть null или отсутствовать
  @IsNumber()
  team_?: number | null;

  @IsOptional()
  @IsNumber()
  user_?: number | null;
}