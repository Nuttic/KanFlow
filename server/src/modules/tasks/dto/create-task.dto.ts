import { IsEnum, IsString, IsNumber, IsOptional } from "class-validator";
import { Status, Difficult, } from "../../../db/entities/task.entity";

export class CreateTaskDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsEnum(Status)
    status: Status;
    @IsEnum(Difficult)
    difficult_level: Difficult;
    @IsNumber()
    creator_: number;
    @IsNumber()
    collection_: number;
}