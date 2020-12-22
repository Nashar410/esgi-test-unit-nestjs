import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TodolistModule } from './todolist/todolist.module';
import { ItemModule } from './item/item.module';
import { MailerService } from './shared/services/mailer/mailer.service';
import { ItemNameUniqueConstraint } from './shared/validators/item-name-unique.validator';
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
