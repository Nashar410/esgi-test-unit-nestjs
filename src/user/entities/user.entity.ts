import { Exclude } from 'class-transformer';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  birthDate: Date;

  @Column({
    type: 'bool',
    nullable: false,
  })
  isValid: boolean;

  @OneToOne(() => Todolist, (todolist) => todolist.user)
  todolist: Todolist;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
