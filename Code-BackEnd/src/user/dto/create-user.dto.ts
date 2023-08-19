import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com' })
  email: string;

  @ApiProperty({ example: 'user' })
  username: string;

  @ApiProperty({ example: '21336195000115' })
  cnpj: string;

  @ApiProperty({ example: 'name' })
  name: string;

  @ApiProperty({ example: 'pass' })
  password: string;

  @ApiProperty({ example: '12912341234' })
  phone: string;

  @ApiProperty()
  photoURL?: string;

  @ApiProperty({ example: 'Rio Grande do Sul' })
  state: string;

  @ApiProperty({ example: 'Porto Alegre' })
  city: string;

  @ApiProperty({ example: 'Rua João Pereira' })
  street: string;

  @ApiProperty({ example: '12' })
  number: string;

  @ApiProperty({ example: 'Casa' })
  complement: string;

  @ApiProperty({ example: '12345123' })
  postalCode: string;

  @ApiProperty({ example: 'Vizinhança' })
  neighborhood: string;

  @ApiProperty({ example: '15/04/2023' })
  dateAndTime: Date;
}
