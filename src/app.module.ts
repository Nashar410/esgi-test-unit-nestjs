import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TodolistModule } from './todolist/todolist.module';
import { ItemModule } from './item/item.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TodolistModule,
    ItemModule,
    SharedModule,
  ],
})
export class AppModule {}
