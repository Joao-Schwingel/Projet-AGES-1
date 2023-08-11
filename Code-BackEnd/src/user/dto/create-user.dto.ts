import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The organization email',
        minimum: 1,
        default: 1,
      })
    email: string;
  
    @ApiProperty()
    username: string;

    @ApiProperty()
    cnpj: string;
  
    @ApiProperty()
    role:string
    
    @ApiProperty()
    password: string;
  
}
