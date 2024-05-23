import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from './companies.schema';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async create(name: string) {
    const createdCompany = new this.companyModel({ name });

    return createdCompany.save();
  }

  async findOne(id: { _id: string }) {
    return this.companyModel.findOne({ _id: id }).exec();
  }
}
