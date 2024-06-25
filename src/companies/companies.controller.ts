import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dtos/companies.dtos';
import { Public } from '../auth/is-public.decorator';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findOne(@Req() req): Promise<any> {
    return this.companiesService.findOne(req.id);
  }

  @Post()
  @Public()
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<string> {
    return this.companiesService.create(createCompanyDto.name);
  }
}
