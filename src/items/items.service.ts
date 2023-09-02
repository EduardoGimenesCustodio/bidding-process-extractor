import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { DataSource } from 'typeorm';
import { ItemModel } from 'src/infra/database/typeOrm/models/item.entity';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(private dataSource: DataSource) {}

  async create(createItemDto: CreateItemDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const item: Omit<ItemModel, 'id'> = createItemDto;
      await queryRunner.manager.save(item);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ItemEntity[]> {
    let items: ItemEntity[];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      items = await queryRunner.manager.find(ItemModel);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();

      return items;
    }
  }

  async findOne(id: number): Promise<ItemEntity> {
    let item: ItemEntity;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      item = await queryRunner.manager.findOne(ItemModel, { where: { id } });

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
      await queryRunner.manager.update(ItemModel, id, updateItemDto);

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
      const item = await queryRunner.manager.findOne(ItemModel, {
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
