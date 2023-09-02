import { Item } from 'src/items/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Process {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoLicitacao: string;

  @Column()
  identificacao: string;

  @Column()
  numero: string;

  @Column()
  resumo: string;

  @Column()
  codigoSituacaoEdital: number;

  @Column()
  codigoStatus: number;

  @Column()
  dataHoraInicioLances: Date;

  @OneToMany(() => Item, (item) => item.process)
  items: Item[];
}
