import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { resolveSoa } from 'dns';
import { Observable } from 'rxjs';
import { CreateItemDto } from 'src/item/dto/create-item.dto';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class ItemNameUniqueGuard implements CanActivate {
  constructor(private itemService: ItemService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.resolve(
      context.switchToHttp().getRequest().params.createItemDto,
    );
  }

  async resolve(item: CreateItemDto) {
    return this.itemService.isItemContentLength(item);
  }
}
