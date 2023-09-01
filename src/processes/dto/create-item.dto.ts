import { Item } from '../interfaces/item.interface';

export class CreateItemDto implements Omit<Item, 'id'> {
  quantidade: number;
  valorReferencia: number;
  descricao: string;
  codigoParticipacao: number;
  codigo: number;
  processId: number;
}
