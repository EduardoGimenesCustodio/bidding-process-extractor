import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessModel } from '../infra/database/typeOrm/models/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessModel])],
  exports: [TypeOrmModule],
  controllers: [ProcessesController],
  providers: [ProcessesService],
})
export class ProcessesModule {}
