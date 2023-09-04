import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessModel } from '../infra/database/typeOrm/models/process.entity';
import { ExtractProcessesListener } from './listeners/extract-processes.listener';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessModel]), HttpModule],
  exports: [TypeOrmModule],
  controllers: [ProcessesController],
  providers: [ProcessesService, ExtractProcessesListener],
})
export class ProcessesModule {}
