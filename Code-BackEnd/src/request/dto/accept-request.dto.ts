import { ApiProperty } from '@nestjs/swagger';

export class AcceptRequestDto {
  @ApiProperty()
  requestId?: number;
}
