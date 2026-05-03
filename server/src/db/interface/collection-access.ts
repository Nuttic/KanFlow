import { IsBoolean } from "class-validator"

export class AccessCollection {
    @IsBoolean()
    CanRead: boolean
    @IsBoolean()
    CanAddTask: boolean
    @IsBoolean()
    CanEditTask: boolean
    @IsBoolean()
    CanChangeTaskStatus: boolean
    @IsBoolean()
    CanDeleteBoard: boolean
}