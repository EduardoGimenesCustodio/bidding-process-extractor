import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { ItemModel } from '../infra/database/typeOrm/models/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractItemsListener } from './listeners/extract-items.listener';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([ItemModel]), HttpModule],
  exports: [TypeOrmModule],
  controllers: [ItemsController],
  providers: [ItemsService, ExtractItemsListener],
})
export class ItemsModule {}
