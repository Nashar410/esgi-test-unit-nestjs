import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { Todolist } from './entities/todolist.entity';

@Injectable()
export class TodolistService {

  constructor(
    @InjectRepository(Todolist)
    private todolistRepository: Repository<Todolist>
    ) { }

  async create(createTodolistDto: CreateTodolistDto) {
    return await this.todolistRepository.create(createTodolistDto);
  }

  async findAll() {
    return await this.todolistRepository.find();
  }

  async findOne(id: string, options?: FindOneOptions<Todolist>): Promise<Todolist> {;
    return await this.todolistRepository.findOne(id);
  }

  async update(id: string, updateTodolistDto: UpdateTodolistDto) {
    return await this.todolistRepository.update(id, updateTodolistDto);
  }

  /**
   * Return all of a todolist items
   * @param id 
   */
  async findAllItems(id: string) {
    return (await this.todolistRepository.findOne(id)).items;
  }



}
