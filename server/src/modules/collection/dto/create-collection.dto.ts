import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'
import {Type} from '../../../db/entities/collection.entity'

export class CreateCollectionDTO {
  @IsEnum(Type)
  type: Type;

  @IsString()
  title: string;

  @IsString()
  description: string; // Исправлена опечатка

  @IsOptional() // Позволяет полю быть null или отсутствовать
  @IsNumber()
  team_?: number | null;

  @IsOptional()
  @IsNumber()
  user_?: number | null;
}