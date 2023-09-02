import { IItem } from '../../items/interfaces/item.interface';

export interface IProcess {
  id?: number;
  codigoLicitacao: string;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  codigoStatus: number;
  dataHoraInicioLances: Date;
  items?: IItem[];
}
