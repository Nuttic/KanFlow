import { IsNumber, IsOptional, IsObject, IsNotEmpty } from 'class-validator';
import { AccessCollection } from '../../../db/interface/collection-access';

export class CreateAccessCollection {
    @IsOptional()
    @IsNumber()
    user_?: number | null;

    @IsOptional()
    @IsNumber()
    team_?: number | null;

    @IsNotEmpty()
    @IsNumber()
    collection_: number;

    @IsNotEmpty()
    @IsObject()
    access: AccessCollection;
}