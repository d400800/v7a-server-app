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
import {
  CreateShoppingListItemDto,
  ShoppingListDto,
  UpdateShoppingListItemDto,
} from './dtos/shopping-list.dto';
import { ShoppingListService } from './shopping-list.service';

@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req): Promise<ShoppingListDto[]> {
    const companyId = req.user.companyId;

    return this.shoppingListService.findAll(companyId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Req() req,
    @Body() createShoppingListItemDto: CreateShoppingListItemDto,
  ) {
    const companyId = req.user.companyId;

    return this.shoppingListService.create(
      createShoppingListItemDto,
      companyId,
    );
  }

  @Patch(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateShoppingListItemDto: UpdateShoppingListItemDto,
  ) {
    if (!productId) {
      throw new BadRequestException('productId is not specified');
    }

    return this.shoppingListService.update(
      productId,
      updateShoppingListItemDto,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.shoppingListService.delete(id);
  }
}
