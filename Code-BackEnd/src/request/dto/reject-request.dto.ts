import { ApiProperty } from '@nestjs/swagger';

export class RejectRequestDto {
  @ApiProperty()
  requestId?: number;
}
