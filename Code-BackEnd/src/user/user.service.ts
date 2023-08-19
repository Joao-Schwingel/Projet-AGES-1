import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient, User } from '@prisma/client';
import { InstitutionFilterDto } from './dto/institution-filter.dto';

type FindAllQueryBase = Pick<
  Parameters<PrismaClient['user']['findMany']>[0],
  'where' | 'orderBy'
>;
type FindAllQueryWhere = FindAllQueryBase['where'];

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(body: CreateUserDto) {
    const newUser = {
      ...body,
      dateAndTime: new Date(),
    };
    return this.prisma.user.create({
      data: newUser,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({
      where: { userId: id },
      select: {
        userId: true,
        username: true,
        role: true,
        name: true,
        photoURL: true,
      },
    });
  }

  async findOneByCnpj(cnpj: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: { cnpj: cnpj },
    });
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: { username: username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private getPagination(filter: InstitutionFilterDto) {
    const page = filter.page || 0;
    const pageSize = filter.pageSize || 10;
    return {
      page: page,
      pageSize: pageSize,
    };
  }

  private getName(filter: InstitutionFilterDto) {
    const nameFilter: FindAllQueryWhere = {
      name: {
        contains: filter.name?.trim() || undefined,
        mode: 'insensitive',
      },
    };
    return nameFilter;
  }

  private async getInstitution(query, page, pageSize) {
    const requests = await this.prisma.user.findMany({
      ...query,
      select: {
        name: true,
        city: true,
        postalCode: true,
        photoURL: true,
        number: true,
        email: true,
        username: true,
      },
      skip: page * pageSize,
      take: +pageSize,
    });
    const totalCount = await this.prisma.user.count({
      where: {
        role: 'institution',
      },
    });
    return {
      items: requests,
      totalCount: totalCount,
    };
  }

  async findAllInstitutionAdmin(filter: InstitutionFilterDto) {
    const { page, pageSize } = this.getPagination(filter);
    const name = this.getName(filter);
    const query: FindAllQueryBase = {
      where: {
        ...name,
        role: 'institution',
      },
      orderBy: {
        dateAndTime: 'desc',
      },
    };
    return this.getInstitution(query, page, pageSize);
  }
}
