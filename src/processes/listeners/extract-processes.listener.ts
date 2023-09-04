import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ExtractProcessesEvent } from '../events/extract-processes.event';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ProcessEntity } from '../entities/process.entity';
import { ProcessesService } from '../processes.service';

@Injectable()
export class ExtractProcessesListener {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private processesService: ProcessesService,
  ) {}

  @OnEvent('processes.extract')
  async handleExtractProcessesEvent(event: ExtractProcessesEvent) {
    const publicProcurementPortalApiHost = this.configService.get<string>(
      'publicProcurementPortalApi.host',
    );

    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() + 30);

    await this.createProcesses(publicProcurementPortalApiHost, limitDate);

    console.log(event);
  }

  async createProcesses(
    publicProcurementPortalApiHost: string,
    limitDate: Date,
  ): Promise<void> {
    const { data } = await firstValueFrom(
      this.httpService
        .get(`${publicProcurementPortalApiHost}/licitacao/processos`)
        .pipe(
          catchError((err: AxiosError) => {
            throw err;
          }),
        ),
    );

    const processes = data.result.filter((process) => {
      const processDate = new Date(process.dataHoraInicioLances);
      if (processDate <= limitDate) return process;
    });

    await this.processesService.removeAll();

    if (!processes.length) return;

    const processToCreate: ProcessEntity[] = processes.map((process) => {
      return { ...process, codigoStatus: process.status.codigo };
    });

    await Promise.all(
      processToCreate.map(async (process) => {
        await this.processesService.create(process);
      }),
    );
  }
}
