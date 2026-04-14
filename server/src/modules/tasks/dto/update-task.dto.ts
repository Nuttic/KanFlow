// import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber, IsString, IsOptional} from "class-validator"
import { Status, Difficult} from "../../../db/entities/task.entity"
export class UpdateTaskDto {
        @IsString()
        @IsOptional()
        title?: string
        @IsString()
        @IsOptional()
        description?: string
        @IsEnum(Status)
        @IsOptional()
        status?: Status
        @IsEnum(Difficult)
        @IsOptional()
        difficult_level?: Difficult
        @IsNumber()
        @IsOptional()
        executer_?: number
}
