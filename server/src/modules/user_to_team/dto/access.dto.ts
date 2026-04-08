
import { IsBoolean, IsOptional } from 'class-validator';

export class AccessPermissionsDto {
    @IsBoolean()
    canEdit: boolean;
    @IsBoolean()
    canRewiew: boolean
    @IsBoolean()
    canCreateBoard: boolean
    @IsOptional()
    @IsBoolean()
    isCreator?: boolean;
}