import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BaseDto } from '../../shared/base.dto';

enum Unit {
  kilogram = 'kilogram',
  litre = 'litre',
  none = 'none',
}

export class ProductDto extends BaseDto {
  @IsString()
  readonly id: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsEnum(Unit)
  unit: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(Unit)
  @IsNotEmpty()
  unit: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
