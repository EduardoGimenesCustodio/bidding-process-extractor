import { ConfigService } from '@nestjs/config';
import { ItemsService } from '../items.service';
import { HttpService } from '@nestjs/axios';
import { OnEvent } from '@nestjs/event-emitter';
import { ExtractItemsEvent } from '../events/extract-items.event';
import { ItemEntity } from '../entities/item.entity';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

export class ExtractItemsListener {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private itemsService: ItemsService,
  ) {}

  @OnEvent('items.extract', { promisify: true })
  async handleExtractItemsEvent(event: ExtractItemsEvent) {
    const publicProcurementPortalApiHost = this.configService.get<string>(
      'publicProcurementPortalApi.host',
    );

    const { processes } = event;

    await Promise.all(
      processes.map(async (process) => {
        const { data } = await firstValueFrom(
          this.httpService
            .get(
              `${publicProcurementPortalApiHost}/licitacao/${process.codigoLicitacao}/itens`,
            )
            .pipe(
              catchError((err: AxiosError) => {
                throw err;
              }),
            ),
        );

        await this.itemsService.removeAll();

        if (!data.result.length) return;

        const itemsToCreate: ItemEntity[] = data.result.map((item) => {
          return {
            ...item,
            codigoParticipacao: item.participacao.codigo,
            processId: process.id,
          };
        });

        await Promise.all(
          itemsToCreate.map(async (item) => {
            await this.itemsService.create(item);
          }),
        );
      }),
    );
  }
}
