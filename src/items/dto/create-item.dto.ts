import { ItemEntity } from '../entities/item.entity';

export class CreateItemDto implements Omit<ItemEntity, 'id'> {
  quantidade: number;
  valorReferencia: number;
  descricao: string;
  codigoParticipacao: number;
  codigo: number;
  processId: number;
}
