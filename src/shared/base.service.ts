import { BaseRepository } from './base.repository';
import { BaseSchema } from './base.schema';

export class BaseService<T extends BaseSchema, Dto> {
  constructor(private readonly repository: BaseRepository<T>) {}

  async findAll(query: any): Promise<Dto[]> {
    const items = await this.repository.find(query);

    return items.map((item) => this.toDto(item));
  }

  async findOne(query: any) {
    return this.repository.findOne(query);
  }

  async create(createDto: any, companyId: string): Promise<Dto> {
    const item = await this.repository.create(createDto, companyId);

    return this.toDto(item);
  }

  async update(id: string, updateDto: any): Promise<Dto | null> {
    const item = await this.repository.update(id, updateDto);

    return item ? this.toDto(item) : null;
  }

  async delete(id: string): Promise<{ deletedCount?: number }> {
    return this.repository.delete(id);
  }

  protected toDto(item: T): Dto {
    console.log(item);

    // Convert the document to a DTO; should be implemented in subclasses
    throw new Error('toDto method not implemented');
  }
}
