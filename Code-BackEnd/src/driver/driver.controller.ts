import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { Role } from './../roles/role.enum';
import { Roles } from './../roles/roles.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { RolesGuard } from './../roles/roles.guard';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiQuery({ name: 'generalRegister', required: true })
  @ApiQuery({ name: 'name', required: true })
  @ApiQuery({ name: 'phoneNumber', required: true })
  createDriver(
    @Query('name') generalRegister: string,
    @Query('page') name: string,
    @Query('pageSize') phoneNumber: string,
  ) {   
    return this.driverService.findByGeneralRegisterOrCreate(generalRegister, name, phoneNumber);
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Institution)
  @ApiQuery({ name: 'generalRegister', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  findDrivers(
    @Query('generalRegister') generalRegister?: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    if (pageSize > 100) {
      throw new BadRequestException(
        'Tamanho da página não pode ser maior do que 100.',
      );
    }
    return this.driverService.findAll({ page, pageSize, generalRegister });
  }
}
