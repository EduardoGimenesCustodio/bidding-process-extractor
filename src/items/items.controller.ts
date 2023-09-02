import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { IItem } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<void> {
    return await this.itemsService.create(createItemDto);
  }

  @Get()
  async findAll(): Promise<IItem[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IItem> {
    return await this.itemsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<void> {
    return await this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.itemsService.remove(+id);
  }
}
