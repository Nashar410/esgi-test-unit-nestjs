import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TodolistService } from './todolist.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todolistService: TodolistService) {}

  @Post()
  create(@Body() createTodolistDto: CreateTodolistDto) {
    return this.todolistService.create(createTodolistDto);
  }

  @Get()
  findAll() {
    return this.todolistService.findAll();
  }

  @Get(':id')
  findAllItems(@Param('id') todolistId: string) {
    return this.todolistService.findAllItems(todolistId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todolistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistService.update(id, updateTodolistDto);
  }
}
