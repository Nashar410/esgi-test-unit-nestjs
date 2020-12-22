import { forwardRef, Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './entities/item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodolistService } from 'src/todolist/todolist.service';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ItemNameUniqueConstraint } from 'src/shared/validators/item-name-unique.validator';
import { TodolistModule } from 'src/todolist/todolist.module';
import { UserModule } from 'src/user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    TodolistModule,
    UserModule,
    forwardRef(() => SharedModule),
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
