import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationSkillDto } from './create-organization-skill.dto';

export class UpdateOrganizationSkillDto extends PartialType(CreateOrganizationSkillDto) {}
