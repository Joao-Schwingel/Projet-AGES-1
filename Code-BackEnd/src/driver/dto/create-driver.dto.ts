import { ApiProperty } from '@nestjs/swagger';

export class CreateDriverDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  generalRegister: string;

  @ApiProperty()
  phoneNumber: string;institution
}
