import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseDto } from '../../shared/base.dto';

export class CreateShoppingListItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class UpdateShoppingListItemDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class ShoppingListDto extends BaseDto {
  @IsString()
  productId: string;

  @IsNumber()
  amount: number;
}
