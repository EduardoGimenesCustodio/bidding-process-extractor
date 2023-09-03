import { Injectable } from '@nestjs/common';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { DataSource, Like, MoreThanOrEqual } from 'typeorm';
import { ProcessModel } from '../infra/database/typeOrm/models/process.entity';
import { ProcessEntity } from './entities/process.entity';
import { FindProcessesDto } from './dto/find-processes.dto';

@Injectable()
export class ProcessesService {
  constructor(private dataSource: DataSource) {}

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

  async findAll(findProcessesDto: FindProcessesDto): Promise<ProcessEntity[]> {
    let processes: ProcessEntity[];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { dataHoraInicioLances, numero, resumo, descricaoItem } =
        findProcessesDto;

      let whereOptions: object[] = [];

      if (dataHoraInicioLances || numero || resumo || descricaoItem) {
        whereOptions = [
          {
            dataHoraInicioLances: MoreThanOrEqual(
              new Date(dataHoraInicioLances),
            ),
          },
          { numero: numero },
          { resumo: Like(`%${resumo}%`) },
          {
            items: {
              descricao: Like(`%${descricaoItem}%`),
            },
          },
        ];
      }

      processes = await queryRunner.manager.find(ProcessModel, {
        where: whereOptions,
        relations: ['items'],
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
}
