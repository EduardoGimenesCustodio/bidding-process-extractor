import { Module } from '@nestjs/common';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from '../infra/database/typeOrm/entities/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Process])],
  exports: [TypeOrmModule],
  controllers: [ProcessesController],
  providers: [ProcessesService],
})
export class ProcessesModule {}
