import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ExtractProcessesEvent } from '../events/extract-processes.event';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ProcessEntity } from '../entities/process.entity';
import { ProcessesService } from '../processes.service';
import { ItemsService } from '../../items/items.service';
import { ItemEntity } from '../../items/entities/item.entity';

@Injectable()
export class ExtractProcessesListener {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private processesService: ProcessesService,
    private itemsService: ItemsService,
  ) {}

  publicProcurementPortalApiHost = this.configService.get<string>(
    'publicProcurementPortalApi.host',
  );

  @OnEvent('processes.extract', { promisify: false })
  async handleExtractProcessesEvent(event: ExtractProcessesEvent) {
    await this.processesService.removeAll();
    await this.itemsService.removeAll();

    await this.createProcesses();

    console.log(event);
  }

  async createProcesses(): Promise<void> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${this.publicProcurementPortalApiHost}/licitacao/processos`)
        .pipe(
          catchError((err: AxiosError) => {
            throw err;
          }),
        ),
    );

    const processes = data.result;

    if (!processes.length) return;

    const processesToCreate: ProcessEntity[] = processes.map((process) => {
      return { ...process, codigoStatus: process.status.codigo };
    });

    await Promise.all(
      processesToCreate.map(async (process) => {
        const { processId, codigoLicitacao } =
          await this.processesService.create(process);
        await this.createItems(processId, codigoLicitacao);
      }),
    );
  }

  async createItems(processId: number, codigoLicitacao: number): Promise<void> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${this.publicProcurementPortalApiHost}/licitacao/${codigoLicitacao}/itens`,
        )
        .pipe(
          catchError((err: AxiosError) => {
            throw err;
          }),
        ),
    );

    if (!data.itens) return;

    const items = data.itens.result;

    if (!items.length) return;

    const itemsToCreate: ItemEntity[] = items.map((item) => {
      return {
        ...item,
        processId,
        codigoParticipacao: item.participacao.codigo,
      };
    });

    await Promise.all(
      itemsToCreate.map(async (item) => {
        await this.itemsService.create(item);
      }),
    );
  }
}
