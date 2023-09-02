import { ProcessEntity } from '../entities/process.entity';

export class CreateProcessDto implements Omit<ProcessEntity, 'id'> {
  codigoLicitacao: string;
  identificacao: string;
  numero: string;
  resumo: string;
  codigoSituacaoEdital: number;
  codigoStatus: number;
  dataHoraInicioLances: Date;
}
