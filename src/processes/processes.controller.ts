import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { IProcess } from './interfaces/process.interface';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  create(@Body() createProcessDto: CreateProcessDto): Promise<void> {
    return this.processesService.create(createProcessDto);
  }

  @Get()
  async findAll(): Promise<IProcess[]> {
    return await this.processesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IProcess> {
    return this.processesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcessDto: UpdateProcessDto,
  ): Promise<void> {
    return this.processesService.update(+id, updateProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.processesService.remove(+id);
  }
}
