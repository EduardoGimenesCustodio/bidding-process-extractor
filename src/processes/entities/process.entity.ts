import { ItemEntity } from '../../items/entities/item.entity';

export class ProcessEntity {
  id: number;
  codigoLicitacao: number;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  codigoStatus: number;
  dataHoraInicioLances: Date;
  items?: ItemEntity[];
}
