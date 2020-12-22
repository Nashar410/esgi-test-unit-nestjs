import { Todolist } from 'src/todolist/entities/todolist.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
  })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdDate: Date;

  @ManyToOne(() => Todolist, (todolist) => todolist.items)
  todolist: Todolist;

  constructor(item?: Partial<Item>) {
    if (!!item) {
      Object.assign(this, item);
    }
  }
}
