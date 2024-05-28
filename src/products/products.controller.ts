import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, ProductDto } from './dtos/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req): Promise<ProductDto[]> {
    const companyId = req.user.companyId;

    return this.productsService.findAll({ companyId });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createProduct(@Req() req, @Body() createProductDto: CreateProductDto) {
    const companyId = req.user.companyId;

    return this.productsService.create(createProductDto, companyId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() productDto: Partial<ProductDto>,
  ) {
    if (!id) {
      throw new BadRequestException('Id is not specified');
    }

    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
