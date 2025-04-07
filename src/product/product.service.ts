import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProductInput: CreateProductInput) {
    try {
      let product = await this.prisma.product.create({ data: createProductInput })
      return product
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      let products = await this.prisma.product.findMany()
      return products
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try {
      let product = await this.prisma.product.findUnique({ where: { id } })
      if (!product) return new HttpException("Not found", HttpStatus.NOT_FOUND)
      return product
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    try {
      let updated = await this.prisma.product.update({
        data: updateProductInput,
        where: { id }
      })
      return updated
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.product.delete({ where: { id } })
      return deleted
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
