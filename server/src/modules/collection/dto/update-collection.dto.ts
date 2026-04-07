import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateCollectionDTO } from './create-collection.dto';

export class UpdateCollectionDTO extends PartialType(
  OmitType(CreateCollectionDTO, ['team_', 'user_'] as const),
) {}