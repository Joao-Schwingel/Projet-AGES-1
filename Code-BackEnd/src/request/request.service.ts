import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { RequestFilterDto } from './dto/request-filter.dto';
import { PrismaClient } from '@prisma/client';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateRequestBodyDto } from './dto/create-request-body.dto';
import { MedicamentService } from '../medicament/medicament.service';
import { AcceptRequestDto } from './dto/accept-request.dto';
import { RejectRequestDto } from './dto/reject-request.dto';
import { CreateDeliveryBodyDto } from './dto/create-delivery-body.dto';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { DriverService } from 'src/driver/driver.service';

type FindAllQueryBase = Pick<
  Parameters<PrismaClient['request']['findMany']>[0],
  'where' | 'orderBy'
>;
type FindAllQueryWhere = FindAllQueryBase['where'];
@Injectable()
export class RequestService {
  constructor(
    private prisma: PrismaService,
    private medicamentService: MedicamentService,
    private driverService: DriverService,
  ) {}
  async create(body: CreateRequestBodyDto, userId: number) {
    const newRequest = new CreateRequestDto();
    newRequest.amount = body.amount;
    newRequest.crm = body.crm;
    newRequest.doctor = body.doctor;
    newRequest.genericAccepted = body.genericAccepted;
    newRequest.observation = body.observation;
    newRequest.originInstitutionId = userId;
    newRequest.status = 'active';
    newRequest.dateAndTime = new Date();
    const medicament = await this.medicamentService.findByNameAndDosageOrCreate(
      body.medicament,
      body.dosage,
      body.principleActive,
    );
    newRequest.medicamentId = medicament.medicamentId;

    return this.prisma.request.create({
      data: newRequest,
      include: {
        originInstitution: true,
        medicament: true,
      },
    });
  }

  async findById(id: number) {
    const request = await this.prisma.request.findUnique({
      where: { requestId: id },
      include: this.getInclude(),
    });
    if (!request) {
      return new NotFoundException(`Request with id ${id} not found`);
    }
    return request;
  }

  private getMedicametFilter(filter: RequestFilterDto) {
    const medicamentFilter: FindAllQueryWhere = {
      medicament: {
        name: {
          contains: filter.medicamentNameContains?.trim() || undefined,
          mode: 'insensitive',
        },
      },
    };
    return medicamentFilter;
  }

  getSenderNameContains(filter: RequestFilterDto) {
    const senderNameContains: FindAllQueryWhere = {
      accepterUser: filter.senderNameContains
        ? {
            name: {
              contains: filter.senderNameContains || undefined,
              mode: 'insensitive',
            },
          }
        : undefined,
    };
    return senderNameContains;
  }

  getRequesterNameContains(filter: RequestFilterDto) {
    const requesterNameContains: FindAllQueryWhere = {
      originInstitution: filter.requesterNameContains
        ? {
            name: {
              contains: filter.requesterNameContains || undefined,
              mode: 'insensitive',
            },
          }
        : undefined,
    };
    return requesterNameContains;
  }

  private getDeliveryFilter(filter: RequestFilterDto) {
    const deliveryFilter: FindAllQueryWhere = {
      delivery: filter.driverNameContains
        ? {
            driver: {
              name: {
                contains: filter.driverNameContains?.trim() || undefined,
                mode: 'insensitive',
              },
            },
          }
        : undefined,
    };
    return deliveryFilter;
  }

  private getDateTimeFilter(filter: RequestFilterDto) {
    const { startDay, endDay } = this.getDayFilter(filter);
    const dateTimeFilter = {
      dateAndTime: {
        gte: filter.minDay || undefined,
        lte: filter.maxDay || undefined,
      },
      AND: [
        {
          dateAndTime: {
            gte: startDay || undefined,
            lte: endDay || undefined,
          },
        },
      ],
    };
    return dateTimeFilter;
  }

  private getStatsFilter(filter: RequestFilterDto) {
    const statsFilter = {
      status: {
        equals: filter.status || undefined,
      },
    };
    return statsFilter;
  }

  getInclude() {
    const getInclude = {
      medicament: true,
      delivery: {
        include: {
          driver: true,
        },
      },
      originInstitution: true,
      accepterUser: true,
    };
    return getInclude;
  }

  private async getRequests(query, page, pageSize) {
    const requests = await this.prisma.request.findMany({
      ...query,
      include: this.getInclude(),
      skip: page * pageSize,
      take: +pageSize,
    });
    const totalCount = await this.prisma.request.count(query);
    return {
      items: requests,
      totalCount: totalCount,
    };
  }

  getGenericAccepted(filter: RequestFilterDto) {
    return {
      genericAccepted: filter.genericAccepted,
    };
  }

  private getPagination(filter: RequestFilterDto) {
    const page = filter.page || 0;
    const pageSize = filter.pageSize || 10;
    return {
      page: page,
      pageSize: pageSize,
    };
  }

  private getDayFilter(filter: RequestFilterDto) {
    let startDay = undefined;
    let endDay = undefined;
    if (filter.day) {
      startDay = new Date(filter.day);
      startDay.setUTCHours(0);
      startDay.setUTCMinutes(0);
      startDay.setUTCSeconds(0);

      endDay = new Date(filter.day);
      endDay.setUTCHours(23);
      endDay.setUTCMinutes(59);
      endDay.setUTCSeconds(59);
    }
    return {
      startDay: startDay,
      endDay: endDay,
    };
  }

  async findAllRequestsFromUser(filter: RequestFilterDto) {
    const { page, pageSize } = this.getPagination(filter);
    const getStatsFilter = this.getStatsFilter(filter);
    const getDateTimeFilter = this.getDateTimeFilter(filter);
    const getDeliveryFilter = this.getDeliveryFilter(filter);
    const getMedicametFilter = this.getMedicametFilter(filter);
    const getGenericAccepted = this.getGenericAccepted(filter);
    const getSenderNameContains = this.getSenderNameContains(filter);
    const getRequesterNameContains = this.getRequesterNameContains(filter);
    const query: FindAllQueryBase = {
      where: {
        originInstitutionId: filter.userId,
        ...getStatsFilter,
        ...getDeliveryFilter,
        ...getDateTimeFilter,
        ...getMedicametFilter,
        ...getGenericAccepted,
        ...getSenderNameContains,
        ...getRequesterNameContains,
      },
      orderBy: {
        dateAndTime: 'desc',
      },
    };
    return this.getRequests(query, page, pageSize);
  }

  async findAllRequestsForUser(filter: RequestFilterDto) {
    const { page, pageSize } = this.getPagination(filter);
    const getStatsFilter = this.getStatsFilter(filter);
    const getDateTimeFilter = this.getDateTimeFilter(filter);
    const getDeliveryFilter = this.getDeliveryFilter(filter);
    const getMedicametFilter = this.getMedicametFilter(filter);
    const getGenericAccepted = this.getGenericAccepted(filter);
    const getSenderNameContains = this.getSenderNameContains(filter);
    const getRequesterNameContains = this.getRequesterNameContains(filter);
    const query: FindAllQueryBase = {
      where: {
        accepterUserId:
          filter.status != 'active'
            ? {
                equals: filter.userId,
              }
            : undefined,
        NOT: {
          originInstitutionId: {
            equals: filter.userId,
          },
        },
        userDenies: {
          none: {
            userUserId: filter.userId,
          },
        },
        ...getStatsFilter,
        ...getDeliveryFilter,
        ...getDateTimeFilter,
        ...getMedicametFilter,
        ...getGenericAccepted,
        ...getSenderNameContains,
        ...getRequesterNameContains,
      },
      orderBy: {
        dateAndTime: 'desc',
      },
    };
    return this.getRequests(query, page, pageSize);
  }

  async findAllRequestsAdmin(filter: RequestFilterDto) {
    const { page, pageSize } = this.getPagination(filter);
    const getStatsFilter = this.getStatsFilter(filter);
    const getDateTimeFilter = this.getDateTimeFilter(filter);
    const getDeliveryFilter = this.getDeliveryFilter(filter);
    const getMedicametFilter = this.getMedicametFilter(filter);
    const getGenericAccepted = this.getGenericAccepted(filter);
    const getSenderNameContains = this.getSenderNameContains(filter);
    const getRequesterNameContains = this.getRequesterNameContains(filter);
    const query: FindAllQueryBase = {
      where: {
        ...getStatsFilter,
        ...getDeliveryFilter,
        ...getDateTimeFilter,
        ...getMedicametFilter,
        ...getGenericAccepted,
        ...getSenderNameContains,
        ...getRequesterNameContains,
      },
      orderBy: {
        dateAndTime: 'desc',
      },
    };
    return this.getRequests(query, page, pageSize);
  }

  async reject(body: RejectRequestDto, userId: number) {
    const request = await this.prisma.request.findFirst({
      where: {
        NOT: {
          originInstitutionId: {
            equals: userId,
          },
        },
        requestId: body.requestId,
      },
    });

    if (!request) {
      return new NotFoundException(`Request not found`);
    }

    const isItDenied = await this.prisma.deniedRequests.findFirst({
      where: { requestId: body.requestId, userUserId: userId },
    });

    if (isItDenied) {
      return new ConflictException('Request Already Denied');
    }

    return await this.prisma.deniedRequests.create({
      data: {
        requestId: body.requestId,
        userUserId: userId,
      },
    });
  }

  // async createDelivery(
  //   body: CreateDeliveryBodyDto,
  //   requestId: number,
  //   userId: number,
  // ) {
  //   const enrichedRequest = await this.prisma.request.findFirst({
  //     where: { requestId },
  //     include: {
  //       originInstitution: true,
  //       accepterUser: true,
  //     },
  //   });

  //   if (!enrichedRequest) {
  //     return new NotFoundException(`Request not found`);
  //   }

  //   if (!enrichedRequest.accepterUser) {
  //     return new NotFoundException(`Request not found`);
  //   }

  //   const request = {
  //     dateAndTime: enrichedRequest.dateAndTime,
  //     crm: enrichedRequest.crm,
  //     doctor: enrichedRequest.doctor,
  //     genericAccepted: enrichedRequest.genericAccepted,
  //     observation: enrichedRequest.observation,
  //     status: enrichedRequest.status,
  //     amount: enrichedRequest.amount,
  //     originInstitution: enrichedRequest.originInstitution,
  //     medicament: enrichedRequest.medicamentId
  //   }

  //   const newDelivery = new CreateDeliveryDto();
  //   newDelivery.requestId = requestId;
  //   newDelivery.userId = userId;
  //   newDelivery.description = body.description;
  //   newDelivery.licensePlate = body.licensePlate;
  //   newDelivery.pickUpPlace = enrichedRequest.originInstitution.street;
  //   newDelivery.deliveryPlace = enrichedRequest.accepterUser.street;
  //   newDelivery.phoneNumber = body.phoneNumber;
  //   newDelivery.generalRegister = body.generalRegister;
  //   newDelivery.driverName = body.driverName;

  //   const delivery = await this.driverService.findByGeneralRegisterOrCreate(
  //     body.generalRegister,
  //     body.driverName,
  //     body.phoneNumber,
  //   );
  //   newDelivery.driverId = delivery.driverId;

  //   return this.prisma.delivery.create({
  //     data = {
  //       requestId: requestId,
  //       userId: userId,
  //       description: body.description,
  //       licensePlate: body.licensePlate,
  //       pickUpPlace: enrichedRequest.originInstitution.street,
  //       deliveryPlace: enrichedRequest.accepterUser.street,
  //       phoneNumber: body.phoneNumber,
  //       generalRegister: body.generalRegister,
  //       driverName: body.driverName,
  //       status: 'Em Transporte'
  //       // request: request,
  //     },
  //   });
  // }

  async createDelivery(body: CreateDeliveryBodyDto, requestId: number) {
    const request = await this.prisma.request.findFirst({
      where: { requestId },
      include: {
        originInstitution: true,
        accepterUser: true,
      },
    });

    if (!request) {
      return new NotFoundException(`Request not found`);
    }

    if (!request.accepterUser) {
      return new NotFoundException(`Request not found`);
    }

    const newDelivery = new CreateDeliveryDto();
    newDelivery.description = body.description;
    newDelivery.licensePlate = body.licensePlate;
    newDelivery.status = 'Em Transporte';
    const driver = await this.driverService.findByGeneralRegisterOrCreate(
      body.generalRegister,
      body.driverName,
      body.phoneNumber,
    );
    newDelivery.driverId = driver.driverId;
    newDelivery.requestId = requestId;

    await this.prisma.request.update({
      where: { requestId },
      data: {
        status: 'transport',
      },
    });

    return this.prisma.delivery.create({
      data: newDelivery,
      include: {
        driver: true,
        request: true,
      },
    });
  }

  async accept(body: AcceptRequestDto, userId: number) {
    const request = await this.prisma.request.findFirst({
      where: {
        NOT: {
          originInstitutionId: {
            equals: userId,
          },
        },
        requestId: body.requestId,
        status: 'active',
      },
    });

    if (!request) {
      return new NotFoundException(`Request not found`);
    }

    const isItDenied = await this.prisma.deniedRequests.findFirst({
      where: { requestId: body.requestId, userUserId: userId },
    });

    if (isItDenied) {
      return new ConflictException('You denied this request');
    }
    return await this.prisma.request.update({
      where: { requestId: body.requestId },
      data: {
        status: 'accepted',
        accepterUserId: userId,
      },
    });
  }

  async close(requestId: number, userId: number) {
    const request = await this.prisma.request.findFirst({
      where: { requestId: requestId, originInstitutionId: userId },
    });

    if (!request) {
      return new NotFoundException(`Request with id ${requestId} not found`);
    }

    const isItClosed = await this.prisma.request.findFirst({
      where: { requestId: request.requestId, status: 'done' },
    });

    if (isItClosed) {
      return new ConflictException('Request Already Closed');
    }

    return await this.prisma.request.update({
      where: {
        requestId: request.requestId,
      },
      data: {
        status: 'done',
      },
    });
  }
}
