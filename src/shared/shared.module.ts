import { forwardRef, Module } from '@nestjs/common';
import { ItemModule } from 'src/item/item.module';
import { MailerService } from './services/mailer/mailer.service';
import { ItemNameUniqueConstraint } from './validators/item-name-unique.validator';

@Module({
  imports: [forwardRef(() => ItemModule)],
  providers: [ItemNameUniqueConstraint, MailerService],
  exports: [ItemNameUniqueConstraint, MailerService],
})
export class SharedModule {}
