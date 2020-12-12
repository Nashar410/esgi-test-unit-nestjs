import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodolistService } from 'src/todolist/todolist.service';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { Todolist } from 'src/todolist/entities/todolist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Todolist])],
  controllers: [ItemController],
  providers: [ItemService, TodolistService, MailerService]
})
export class ItemModule {}
