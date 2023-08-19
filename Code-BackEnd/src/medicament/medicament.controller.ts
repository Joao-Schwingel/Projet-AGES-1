import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { MedicamentService } from './medicament.service';
import { Role } from './../roles/role.enum';
import { Roles } from './../roles/roles.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { RolesGuard } from './../roles/roles.guard';
import { CreateMedicamentDto } from './dto/create-medicament.dto';

@ApiTags('medicament')
@Controller('medicament')
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createMedicamentDto: CreateMedicamentDto) {
    return this.medicamentService.create(createMedicamentDto);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Institution)
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  findMedicaments(
    @Query('name') name?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    if (pageSize > 100) {
      throw new BadRequestException(
        'Tamanho da página não pode ser maior do que 100.',
      );
    }
    return this.medicamentService.findAll({ page, pageSize, name });
  }
}
