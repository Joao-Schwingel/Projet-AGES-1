import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
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
}
