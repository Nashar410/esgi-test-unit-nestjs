import { forwardRef, Module } from '@nestjs/common';
import { ItemModule } from 'src/item/item.module';
import { MailerService } from './services/mailer/mailer.service';

@Module({
  imports: [forwardRef(() => ItemModule)],
  providers: [MailerService],
  exports: [MailerService],
})
export class SharedModule {}
