import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum Unit {
  kilogram = 'kilogram',
  litre = 'litre',
  none = 'none',
}

export class ProductDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsEnum(Unit)
  @IsOptional()
  unit: string;
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(Unit)
  @IsNotEmpty()
  unit: string;
}
