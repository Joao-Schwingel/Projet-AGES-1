import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './../roles/role.enum';
import { Roles } from './../roles/roles.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { RolesGuard } from './../roles/roles.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/institution')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiQuery({
    name: 'institution',
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'institution', required: false })
  findAllInstitutions(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
  ) {
    if (pageSize > 100) {
      throw new BadRequestException(
        'Tamanho da página não pode ser maior do que 100.',
      );
    }
    return this.userService.findAllInstitutionAdmin({
      name,
      page,
      pageSize,
    });
  }

  @ApiBearerAuth()
  @Post('/institution')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @Get('/institution/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number) {
    if (id < 1) {
      throw new BadRequestException('Este id(' + id + ') é invalido');
    }
    return this.userService.findOne(+id);
  }

  @ApiBearerAuth()
  @Get('/instituition/:cnpj')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  findOneByCnpj(@Query('cnpj') cnpj: string) {
    return this.userService.findOneByCnpj(cnpj);
  }

  @ApiBearerAuth()
  @Patch('/institution/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @Delete('/institution/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @ApiBearerAuth()
  @Get('/me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Institution)
  findUser(@Request() req) {
    return this.userService.findOne(+req.user.userId);
  }
}
