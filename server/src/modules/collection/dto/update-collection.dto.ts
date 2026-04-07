import { PartialType } from '@nestjs/mapped-types'
import { CreateCollectionDTO } from './create-collection.dto';

export class UpdateCollectionDTO extends PartialType(CreateCollectionDTO) {}