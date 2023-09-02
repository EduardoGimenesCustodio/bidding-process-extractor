import { ProcessModel } from 'src/infra/database/typeOrm/models/process.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItemModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade: number;

  @Column()
  valorReferencia: number;

  @Column()
  descricao: string;

  @Column()
  codigoParticipacao: number;

  @Column()
  codigo: number;

  @Column()
  processId: number;

  @ManyToOne(() => ProcessModel, (process) => process.items)
  process?: ProcessModel;
}
