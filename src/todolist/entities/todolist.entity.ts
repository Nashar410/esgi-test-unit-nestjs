import { Item } from 'src/item/entities/item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todolist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @OneToOne(() => User, (user) => user.todolist)
  user: User;

  @OneToMany(() => Item, (item) => item.todolist)
  items: Item[];

  constructor(todo: Partial<Todolist>) {
    Object.assign(this, todo);
  }
}
