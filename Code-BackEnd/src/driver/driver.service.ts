import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverFilterDto } from '../request/dto/driver-filter.dto';
import { PrismaClient } from '@prisma/client';

type FindAllQueryBase = Pick<
  Parameters<PrismaClient['driver']['findMany']>[0],
  'where'
>;
@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  async create(createDriverDto: CreateDriverDto) {
    return this.prisma.driver.create({
      data: createDriverDto,
    });
  }

  async findByGeneralRegisterOrCreate(
    generalRegister: string,
    name: string,
    phoneNumber: string,
  ) {
    let driver = await this.prisma.driver.findFirst({
      where: {
        generalRegister: {
          equals: generalRegister,
          mode: 'insensitive',
        },
      },
    });
    if (!driver) {
      driver = await this.prisma.driver.create({
        data: {
          name,
          generalRegister,
          phoneNumber,
        },
      });
    }
    return driver;
  }

  async findAll(filter: DriverFilterDto) {
    const { page, pageSize } = this.getPagination(filter);
    const getRGFilter = this.getRGFilter(filter);
    const query: FindAllQueryBase = {
      where: {
        ...getRGFilter,
      },
    };
    return this.getDriver(query, page, pageSize);
  }

  private getRGFilter(filter: DriverFilterDto) {
    const nameFilter = {
      generalRegister: {
        contains: filter.generalRegister?.trim() || undefined,
        mode: 'insensitive',
      },
    } as const;
    return nameFilter;
  }

  private getPagination(filter: DriverFilterDto) {
    const page = filter.page || 0;
    const pageSize = filter.pageSize || 10;
    return {
      page: page,
      pageSize: pageSize,
    };
  }

  private async getDriver(query, page, pageSize) {
    const driver = await this.prisma.driver.findMany({
      ...query,
      skip: page * pageSize,
      take: +pageSize,
    });
    const totalCount = await this.prisma.driver.count(query);
    return {
      items: driver,
      totalCount: totalCount,
    };
  }
}
