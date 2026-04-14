import { IsString, IsNumber} from "class-validator";

export class CreateTagDto{
    @IsString()
    title: string 
}