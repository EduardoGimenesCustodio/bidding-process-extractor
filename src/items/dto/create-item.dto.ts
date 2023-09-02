import { IItem } from '../interfaces/item.interface';

export class CreateItemDto implements Omit<IItem, 'id'> {
  quantidade: number;
  valorReferencia: number;
  descricao: string;
  codigoParticipacao: number;
  codigo: number;
  processId: number;
}
