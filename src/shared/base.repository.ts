import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { BaseSchema } from './base.schema';

export class BaseRepository<T extends BaseSchema> {
  constructor(private readonly model: Model<T>) {}

  async find(query: any): Promise<T[]> {
    return this.model.find(query).exec();
  }

  async findOne(query: any) {
    return this.model.findOne(query).exec();
  }

  async create(createDto: Partial<T>, companyId: string): Promise<T> {
    const createdDocument = new this.model({
      ...createDto,
      companyId,
    } as T); // Use type assertion here

    return createdDocument.save() as Promise<T>;
  }

  async update(id: string, updateData: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.model.deleteOne({ _id: id } as FilterQuery<T>).exec();
  }
}
