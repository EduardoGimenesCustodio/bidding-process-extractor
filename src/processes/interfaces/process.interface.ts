import { Item } from '../../items/interfaces/item.interface';

export interface Process {
  id: number;
  codigoLicitacao: string;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  codigoStatus: number;
  dataHoraInicioLances: Date;
  itens?: Item[];
}
