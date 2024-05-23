import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from './companies.repository';

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}
  async create(name: string) {
    const company = await this.companiesRepository.create(name);

    return company._id;
  }

  async findOne(id: string) {
    return (await this.companiesRepository.findOne({ _id: id })).toObject();
  }
}
