import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { TodolistService } from 'src/todolist/todolist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/shared/constants';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { validate } from 'class-validator';


@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private todolistService: TodolistService,
    private mailerService: MailerService
  ){}
  
  async create(createItemDto: CreateItemDto) {
    try{
      await this.isItemBeCreated(createItemDto);
      await this.isItemTimeLimit(createItemDto);
      await this.isValid(new Item(createItemDto));
      const item = await this.itemRepository.create(createItemDto);
      if (!!item) {
        throw new Error(Constants.ERROR_MSG_ITEM_DIDNT_CREATE);
      }
      return this.sendMail(item.todolist.id)
    
    } catch (error) {
      throw error;
    }
  }

  /**
   * Décide d'envoyé un mail ou non
   * @param todolistItems 
   */
  async sendMail(todoListId: string) {
    const items = await this.todolistService.findAllItems(todoListId);
    if (items.length === Constants.ITEM_NUMBER_TO_SEND_MAIL) {
      // On récupère le mail de l'user
      return this.mailerService.sendMail(items[0].todolist.user.email, Constants.MAIL_ITEM_CAPACITY_SOON_EXCEED);
    }
    return false;
  }

  /**
   * Return all items of a todolist
   * @param id
   */
  async findAllOfTodolist(todolistId: string) {
    return await this.todolistService.findAllItems(todolistId);
  }

  async findOne(id: string) {
    return await this.itemRepository.findOne(id);
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return await this.itemRepository.update(id, updateItemDto)
  }

  /**
   * Supprimer un item par id
   * @param id 
   */
  async delete(id: string) {
    return await this.itemRepository.delete(id);
  }

  /**
   * Supprimer un ensemble d'item
   * @param items 
   */
  async remove(items: Item[]) {
    return await this.itemRepository.remove(items);
  }

  /**
   * Informe sur l'unicité d'un item dans la base de donnée
   * AU sein de sa todolist
   * @param item 
   */
  async isItemUniqueInTodolist(item: Item): Promise<boolean> {
    // Récupération des items de la todolist
    const items: Item[] = (await this.todolistService.findAllItems(item.todolist.id));

    // Push du nouvelle item
    items.push(item);

    // Réponse sur l'unicité donnée ; 
    // les size après coup
    const withoutDup = this.removeDuplicates(items, 'name'); 
    return withoutDup.length === items.length 

  }

  /**
   * Retourne le dernier item créé
   * @param todoListId 
   */
  async findLastItemOfTodolist(todoListId: string) {
    return await this.itemRepository.find({
      where: {
        todolist: todoListId
      },
      relations: ["todolist"],
      order: {
        createdDate : 'DESC'
      },
      take: 1
    });
  }

  private removeDuplicates(array, key) {
    let lookup = {};
    let result = [];
    array.forEach(element => {
        if(!lookup[element[key]]) {
            lookup[element[key]] = true;
            result.push(element);
        }
    });
    return result;
  }

  async isValid(item: Item) {
    // récupération des possibles erreurs
    const errors = await validate(new CreateItemDto(item));

    //s'il y a des erreurs
    if (errors.length) {

      // préparation de la réponse final
      let strError = '';

      // Loop sur les erreurs pour les récupérer toutes
      for (const error of errors) {

        // S'il y a des contraintes
        if (!!error.constraints) {
          
          // Loop sur les contraintes pour les récupérer toutes
          for (const constraint in error.constraints) {

            // concaténer les erreurs à la réponse finales
            strError += `${error.constraints[constraint]}`;
          }
        } else {

          // Des erreurs et pas de contraintes, ne doit jamais arrivé
          // défaillance de la librairie class-validator
          strError += Constants.ERROR_MSG_UNKNOWN_ERROR;
        }
      }
        // Throw d'une erreur avec la réponse finale en message
        throw new Error(strError);
    }
  }

  async isItemTimeLimit(item: Item | CreateItemDto) {
    
    // On récupère la liste des items
    const items = await this.findLastItemOfTodolist(item.todolist.id);

    // L'item est présent, on vérifie
    if (!!items[0].createdDate) {
      // Il y a une date, on la compare à la date actuelle
      // Si le résultat de la soustraction du temps de la date enregistrée
      // et celui de la date actuelle est infierieur à la limite, on refuse l'accès
      let timeBetweenDate = new Date().getTime() - items[0].createdDate.getTime();

      const err = !(timeBetweenDate < Constants.LIMIT_BETWEEN_CREATION);
      if (err) {
        throw new Error(Constants.ERROR_MSG_LIMIT_BETWEEN_ITEM_CREATION)
      }
    }    
  }

  async isItemBeCreated(item: CreateItemDto | Item) {
    // On récupère la liste des items
    const items = await this.todolistService.findAllItems(item.todolist.id);
    // Si pas d'item, on peut ajouter
    if (items.length <= 0) return;
    if (items.length >= Constants.MAX_ITEM_LENGTH) throw new Error(Constants.ERROR_MSG_LIMIT_ITEM_EXCEED);
  }
  
}
