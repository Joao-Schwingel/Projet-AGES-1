import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
  Request,
  BadRequestException,
  Post,
  Body,
  Param,
  ParseBoolPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Role } from './../roles/role.enum';
import { ParseDatePipe } from './pipes/parse-date.pipe';
import { CreateRequestBodyDto } from './dto/create-request-body.dto';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { RejectRequestDto } from './dto/reject-request.dto';
import { CreateDeliveryBodyDto } from './dto/create-delivery-body.dto';

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @ApiBearerAuth()
  @Get('/sent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Institution)
  @ApiQuery({
    name: 'status',
    required: true,
    enum: ['active', 'accepted', 'transport', 'done'],
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'medicamentNameContains', required: false })
  @ApiQuery({ name: 'driverNameContains', required: false })
  @ApiQuery({ name: 'day', required: false, type: 'date' })
  @ApiQuery({ name: 'minDay', required: false })
  @ApiQuery({ name: 'maxDay', required: false })
  @ApiQuery({ name: 'genericAccepted', required: false })
  @ApiQuery({ name: 'senderNameContains', required: false })
  @ApiQuery({ name: 'requesterNameContains', required: false })
  findAllSentRequest(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('medicamentNameContains') medicamentNameContains: string,
    @Query('driverNameContains') driverNameContains: string,
    @Query('status') status: string,
    @Query('senderNameContains') senderNameContains: string,
    @Query('requesterNameContains') requesterNameContains: string,
    @Request() req,
    @Query('day', new ParseDatePipe({ optional: true })) day?: Date,
    @Query('minDay', new ParseDatePipe({ optional: true })) minDay?: Date,
    @Query('maxDay', new ParseDatePipe({ optional: true })) maxDay?: Date,
    @Query('genericAccepted') genericAcceptedStr?: string,
  ) {
    if (pageSize > 100) {
      throw new BadRequestException(
        'Tamanho da página não pode ser maior do que 100.',
      );
    }
    return this.requestService.findAllRequestsFromUser({
      userId: +req.user.userId,
      page,
      pageSize,
      status,
      medicamentNameContains,
      senderNameContains,
      requesterNameContains,
      driverNameContains,
      day: day ? new Date(day) : undefined,
      minDay: minDay ? new Date(minDay) : undefined,
      maxDay: maxDay ? new Date(maxDay) : undefined,
      genericAccepted: genericAcceptedStr
        ? genericAcceptedStr === 'true'
        : undefined,
    });
  }

  @ApiBearerAuth()
  @Get('/received')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Institution)
  @ApiQuery({
    name: 'status',
    required: true,
    enum: ['active', 'accepted', 'transport', 'done'],
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'medicamentNameContains', required: false })
  @ApiQuery({ name: 'driverNameContains', required: false })
  @ApiQuery({ name: 'day', required: false, type: 'date' })
  @ApiQuery({ name: 'minDay', required: false })
  @ApiQuery({ name: 'maxDay', required: false })
  @ApiQuery({ name: 'genericAccepted', required: false })
  @ApiQuery({ name: 'senderNameContains', required: false })
  @ApiQuery({ name: 'requesterNameContains', required: false })
  findOneReceived(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('medicamentNameContains') medicamentNameContains: string,
    @Query('driverNameContains') driverNameContains: string,
    @Query('status') status: string,
    @Query('senderNameContains') senderNameContains: string,
    @Query('requesterNameContains') requesterNameContains: string,
    @Request() req,
    @Query('day', new ParseDatePipe({ optional: true })) day?: Date,
    @Query('minDay', new ParseDatePipe({ optional: true })) minDay?: Date,
    @Query('maxDay', new ParseDatePipe({ optional: true })) maxDay?: Date,
    @Query('genericAccepted') genericAcceptedStr?: string,
  ) {
    if (pageSize > 100) {
      throw new BadRequestException(
        'Tamanho da página não pode ser maior do que 100.',
      );
    }
    return this.requestService.findAllRequestsForUser({
      userId: +req.user.userId,
      page,
      pageSize,
      status,
      medicamentNameContains,
      driverNameContains,
      senderNameContains,
      requesterNameContains,
      day: day ? new Date(day) : undefined,
      minDay: minDay ? new Date(minDay) : undefined,
      maxDay: maxDay ? new Date(maxDay) : undefined,
      genericAccepted: genericAcceptedStr
        ? genericAcceptedStr === 'true'
        : undefined,
    });
  }

  @ApiBearerAuth()
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiQuery({
    name: 'status',
    required: true,
    enum: ['active', 'accepted', 'transport', 'done'],
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'pageSize', required: false })
  @ApiQuery({ name: 'medicamentNameContains', required: false })
  @ApiQuery({ name: 'driverNameContains', required: false })
  @ApiQuery({ name: 'day', required: false, type: 'date' })
  @ApiQuery({ name: 'minDay', required: false })
  @ApiQuery({ name: 'maxDay', required: false })
  @ApiQuery({ name: 'genericAccepted', required: false })
  @ApiQuery({ name: 'senderNameContains', required: false })
  @ApiQuery({ name: 'requesterNameContains', required: false })
  findAllRequestAdmin(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('medicamentNameContains') medicamentNameContains: string,
    @Query('driverNameContains') driverNameContains: string,
    @Query('status') status: string,
    @Query('senderNameContains') senderNameContains: string,
    @Query('requesterNameContains') requesterNameContains: string,
    @Request() req,
    @Query('day', new ParseDatePipe({ optional: true })) day?: Date,
    @Query('minDay', new ParseDatePipe({ optional: true })) minDay?: Date,
    @Query('maxDay', new ParseDatePipe({ optional: true })) maxDay?: Date,
    @Query('genericAccepted') genericAcceptedStr?: string,
  ) {
    if (pageSize > 100) {
      throw new BadRequestException(
        'Tamanho da página não pode ser maior do que 100.',
      );
    }
    return this.requestService.findAllRequestsAdmin({
      page,
      pageSize,
      status,
      medicamentNameContains,
      driverNameContains,
      senderNameContains,
      requesterNameContains,
      day: day ? new Date(day) : undefined,
      minDay: minDay ? new Date(minDay) : undefined,
      maxDay: maxDay ? new Date(maxDay) : undefined,
      genericAccepted: genericAcceptedStr
        ? genericAcceptedStr === 'true'
        : undefined,
    });
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Institution)
  findById(@Param('id') id: number) {
    if (id < 1) {
      throw new BadRequestException('Este id(' + id + ') é invalido');
    }
    return this.requestService.findById(+id);
  }

  @ApiBearerAuth()
  @Post('reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Institution)
  rejectRequest(@Body() RejectRequestDto: RejectRequestDto, @Request() req) {
    return this.requestService.reject(RejectRequestDto, +req.user.userId);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Institution)
  create(@Body() createRequestDto: CreateRequestBodyDto, @Request() req) {
    return this.requestService.create(createRequestDto, +req.user.userId);
  }

  @ApiBearerAuth()
  @Post('/transportation/:requestId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  createDelivery(
    @Body() createDeliveryDto: CreateDeliveryBodyDto,
    @Param('requestId') requestId: number,
  ) {
    return this.requestService.createDelivery(createDeliveryDto, +requestId);
  }

  @Patch('accept')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Institution)
  acceptedRequest(@Body() AcceptRequestDto: AcceptRequestDto, @Request() req) {
    return this.requestService.accept(AcceptRequestDto, +req.user.userId);
  }

  @Patch('close/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Institution)
  closeRequest(@Param('id') requestId: number, @Request() req) {
    if (requestId < 1) {
      throw new BadRequestException('Este id(' + requestId + ') é invalido');
    }
    return this.requestService.close(+requestId, req.user.userId);
  }
}
