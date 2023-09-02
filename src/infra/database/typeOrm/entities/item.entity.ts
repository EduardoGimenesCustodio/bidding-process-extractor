import { Process } from 'src/infra/database/typeOrm/entities/process.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
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

  @ManyToOne(() => Process, (process) => process.items)
  process: Process;
}
