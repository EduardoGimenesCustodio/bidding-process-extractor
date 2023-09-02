import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DataSource } from 'typeorm';
import { Item } from 'src/infra/database/typeOrm/entities/item.entity';
import { IItem } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(private dataSource: DataSource) {}

  async create(createItemDto: CreateItemDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const item: Item = createItemDto;
      await queryRunner.manager.save(item);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<IItem[]> {
    let items: IItem[];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      items = await queryRunner.manager.find(Item);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();

      return items;
    }
  }

  async findOne(id: number): Promise<IItem> {
    let item: IItem;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      item = await queryRunner.manager.findOne(Item, { where: { id } });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();

      return item;
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Item, id, updateItemDto);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const item = await queryRunner.manager.findOne(Item, {
        where: { id },
      });
      await queryRunner.manager.remove(item);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
