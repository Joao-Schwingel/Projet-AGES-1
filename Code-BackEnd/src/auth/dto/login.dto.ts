import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'connectpharmacy' })
  username: string;

  @ApiProperty({ example: 'admin' })
  password: string;
}
