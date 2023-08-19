import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicamentDto {
  @ApiProperty({
    required: false,
  })
  photoURL: string;

  @ApiProperty({
    uniqueItems: true,
  })
  name: string;

  @ApiProperty()
  principleActive?: string;

  @ApiProperty()
  dosage: string;
}
