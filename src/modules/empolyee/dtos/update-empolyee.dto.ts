import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpolyeeDto } from './create-empolyee.dto';

export class UpdateEmpolyeeDto extends PartialType(CreateEmpolyeeDto) {}
