import { ApiProperty } from '@nestjs/swagger';

export class CreateRequestBodyDto {
  @ApiProperty()
  crm: string;

  @ApiProperty()
  doctor: string;

  @ApiProperty()
  genericAccepted: boolean;

  @ApiProperty()
  observation?: string;

  @ApiProperty()
  amount: string;

  @ApiProperty()
  medicament: string;

  @ApiProperty()
  dosage: string;

  @ApiProperty()
  principleActive: string;
}
