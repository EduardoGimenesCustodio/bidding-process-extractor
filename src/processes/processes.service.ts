import { Injectable } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { DataSource, Like, MoreThanOrEqual } from 'typeorm';
import { ProcessModel } from '../infra/database/typeOrm/models/process.entity';
import { ProcessEntity } from './entities/process.entity';
import { FindProcessesDto } from './dto/find-processes.dto';
import { ExtractProcessesEvent } from './events/extract-processes.event';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ProcessesService {
  constructor(
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createProcessDto: CreateProcessDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.insert(ProcessModel, createProcessDto);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(findProcessesDto?: FindProcessesDto): Promise<ProcessEntity[]> {
    let processes: ProcessEntity[];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { dataHoraInicioLances, numero, resumo, descricaoItem } =
        findProcessesDto;

      let whereOptions: object = {};

      if (dataHoraInicioLances || numero || resumo || descricaoItem) {
        whereOptions = {
          dataHoraInicioLances: dataHoraInicioLances
            ? MoreThanOrEqual(new Date(dataHoraInicioLances))
            : undefined,
          numero: numero ? numero : undefined,
          resumo: resumo ? Like(`%${resumo}%`) : undefined,
          items: {
            descricao: descricaoItem ? Like(`%${descricaoItem}%`) : undefined,
          },
        };
      }

      processes = await queryRunner.manager.find(ProcessModel, {
        where: whereOptions,
        relations: { items: true },
        skip: findProcessesDto.skip ? +findProcessesDto.skip : undefined,
        take: findProcessesDto.take ? +findProcessesDto.take : undefined,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();

      return processes;
    }
  }

  async findOne(id: number): Promise<ProcessEntity> {
    let process: ProcessEntity;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      process = await queryRunner.manager.findOne(ProcessModel, {
        where: { id },
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();

      return process;
    }
  }

  async update(id: number, updateProcessDto: UpdateProcessDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(ProcessModel, id, updateProcessDto);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const process = await queryRunner.manager.findOne(ProcessModel, {
        where: { id },
      });
      await queryRunner.manager.remove(process);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async removeAll(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const processes = await queryRunner.manager.find(ProcessModel);
      await queryRunner.manager.remove(processes);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async extractProcesses(): Promise<void> {
    const extractProcessesEvent = new ExtractProcessesEvent();
    this.eventEmitter.emit('processes.extract', extractProcessesEvent);

    return;
  }
}
