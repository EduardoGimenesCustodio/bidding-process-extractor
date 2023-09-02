import { IProcess } from '../interfaces/process.interface';

export class CreateProcessDto implements Omit<IProcess, 'id'> {
  codigoLicitacao: string;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  codigoStatus: number;
  dataHoraInicioLances: Date;
}
