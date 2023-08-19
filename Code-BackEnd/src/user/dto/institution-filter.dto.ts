import { ApiProperty } from '@nestjs/swagger';

export class InstitutionFilterDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  pageSize?: number;
}
