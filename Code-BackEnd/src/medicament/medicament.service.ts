import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateMedicamentDto } from './dto/create-medicament.dto';
import { MedicamentFilterDto } from 'src/request/dto/medicament-filter.dto';
import { PrismaClient } from '@prisma/client';

type FindAllQueryBase = Pick<
  Parameters<PrismaClient['medicament']['findMany']>[0],
  'where'
>;
@Injectable()
export class MedicamentService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicamentDto: CreateMedicamentDto) {
    return this.prisma.medicament.create({
      data: createMedicamentDto,
    });
  }

  async findByNameAndDosageOrCreate(
    name: string,
    dosage: string,
    principleActive: string,
  ) {
    let medicament = await this.prisma.medicament.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        dosage,
      },
    });
    if (!medicament) {
      medicament = await this.prisma.medicament.create({
        data: {
          name,
          dosage,
          principleActive,
        },
      });
    }
    return medicament;
  }

  private getNameFilter(filter: MedicamentFilterDto) {
    const nameFilter = {
      name: {
        contains: filter.name?.trim() || undefined,
        mode: 'insensitive',
      },
    } as const;
    return nameFilter;
  }

  private getPagination(filter: MedicamentFilterDto) {
    const page = filter.page || 0;
    const pageSize = filter.pageSize || 10;
    return {
      page: page,
      pageSize: pageSize,
    };
  }

  private async getMedicament(query, page, pageSize) {
    const medicaments = await this.prisma.medicament.findMany({
      ...query,
      skip: page * pageSize,
      take: +pageSize,
    });
    const totalCount = await this.prisma.medicament.count(query);
    return {
      items: medicaments,
      totalCount: totalCount,
    };
  }

  async findAll(filter: MedicamentFilterDto) {
    const { page, pageSize } = this.getPagination(filter);
    const getNameFilter = this.getNameFilter(filter);
    const query: FindAllQueryBase = {
      where: {
        ...getNameFilter,
      },
    };
    return this.getMedicament(query, page, pageSize);
  }
}
