import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req
} from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateProductDto, DeleteProductDto, ProductDto } from "./dtos/product.dto";
import { DeleteUserDto } from "../users/dtos/user.dtos";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req): Promise<ProductDto[]> {
    const companyId = req.user.companyId;

    return this.productsService.getAllProducts(companyId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async createProduct(@Req() req, @Body() createProductDto: CreateProductDto) {
    const companyId = req.user.companyId;

    return this.productsService.createProduct(createProductDto, companyId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() productDto: ProductDto) {
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
