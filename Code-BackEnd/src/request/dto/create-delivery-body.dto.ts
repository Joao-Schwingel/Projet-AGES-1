import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryBodyDto {
  @ApiProperty()
  'description': string;

  @ApiProperty()
  'licensePlate': string;

  @ApiProperty()
  'driverName': string;

  @ApiProperty()
  'generalRegister': string;

  @ApiProperty()
  'phoneNumber': string;
}
