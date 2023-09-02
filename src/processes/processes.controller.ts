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
import { ProcessEntity } from './entities/process.entity';

@Controller('processes')
export class ProcessesController {
  constructor(private readonly processesService: ProcessesService) {}

  @Post()
  async create(@Body() createProcessDto: CreateProcessDto): Promise<void> {
    return await this.processesService.create(createProcessDto);
  }

  @Get()
  async findAll(): Promise<ProcessEntity[]> {
    return await this.processesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProcessEntity> {
    return await this.processesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProcessDto: UpdateProcessDto,
  ): Promise<void> {
    return await this.processesService.update(+id, updateProcessDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.processesService.remove(+id);
  }

  @Get('extract')
  async extractProcesses(): Promise<void> {
    return;
  }
}
