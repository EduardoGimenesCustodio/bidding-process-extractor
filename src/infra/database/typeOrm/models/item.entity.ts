import { ProcessModel } from './process.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item')
export class ItemModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  quantidade: number;

  @Column({ type: 'float' })
  valorReferencia: number;

  @Column()
  descricao: string;

  @Column()
  codigoParticipacao: number;

  @Column()
  codigo: number;

  @Column()
  processId: number;

  @ManyToOne(() => ProcessModel, (process) => process.items, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  process?: ProcessModel;
}
