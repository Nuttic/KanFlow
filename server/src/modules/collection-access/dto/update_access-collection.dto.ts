import { OmitType, PartialType } from "@nestjs/swagger";
import { CreateAccessCollection } from "./create-access-collection.dto";
import { AccessCollection } from "../../../db/interface/collection-access";
export class UpdateAccessCollectionDto extends PartialType(OmitType(CreateAccessCollection, ['user_', 'team_'] as const)){
    access?:  AccessCollection| undefined;
}