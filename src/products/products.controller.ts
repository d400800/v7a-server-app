import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
    return this.productsService.getAllProducts();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createProduct(@Req() req, @Body() createProductDto: CreateProductDto) {
    const userId = req.user.sub;

    return this.productsService.createProduct(createProductDto, userId);
  }
}
