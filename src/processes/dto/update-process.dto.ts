import { PartialType } from '@nestjs/swagger';
import { CreateProcessDto } from './create-process.dto';

export class UpdateProcessDto extends PartialType(CreateProcessDto) {}
