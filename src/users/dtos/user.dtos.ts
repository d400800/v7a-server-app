import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

enum UserRole {
  ADMIN = 'admin',
  REGULAR = 'regular',
  PREMIUM = 'premium',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly companyId: string;
}

export class DeleteUserDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class UserDto {
  @IsString()
  @IsOptional()
  readonly id: string;

  @IsString()
  @IsOptional()
  readonly companyId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  role: string;

  @IsString()
  @IsOptional()
  password: string;
}
