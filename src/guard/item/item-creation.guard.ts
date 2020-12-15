import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ItemService } from 'src/item/item.service';
import { Constants } from 'src/shared/constants';

/**
 * Guard vérifiant qu'un item peut bien être créer (si la dernière création remonde a + de 30min)
 */
@Injectable()
export class ItemCreationGuard implements CanActivate {

  constructor(private itemService: ItemService) { }
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    return this.resolve(context
      .switchToHttp()
      .getRequest()
      .params
      .createItemDto
      .todolist
      .id);
  }

    async resolve(todolistId: string) {
    
    // On récupère la liste des items
    const item = await this.itemService.findLastItemOfTodolist(todolistId);

    // Si pas d'item, on peut ajouter
    if (item.length <= 0) return true;

    // L'item est présent, on vérifie
    if (!!item[0].createdDate) {
      // Il y a une date, on la compare à la date actuelle
      // Si le résultat de la soustraction du temps de la date enregistrée
      // et celui de la date actuelle est infierieur à la limite, on refuse l'accès
      let timeBetweenDate = new Date().getTime() - item[0].createdDate.getTime();

      return !(timeBetweenDate < Constants.LIMIT_BETWEEN_CREATION)
    }

    return true;
  }
}
