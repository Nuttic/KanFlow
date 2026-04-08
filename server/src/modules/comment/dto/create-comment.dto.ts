import { IsNumber, IsString } from "class-validator"


export class CreateCommentDto {
    @IsNumber()
    creator_: number
    @IsString()
    description: string
    @IsNumber()
    task_: number
}
