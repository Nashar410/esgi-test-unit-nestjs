import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { TodolistService } from 'src/todolist/todolist.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/shared/constants';
import { MailerService } from 'src/shared/services/mailer/mailer.service';


@Injectable()
export class ItemService {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private todolistService: TodolistService,
    private mailerService: MailerService
  ){}
  
  async create(createItemDto: CreateItemDto) {
    const item = await this.itemRepository.create(createItemDto);
    const todolistItems = await this.todolistService.findAllItems(item.todolist.id);
    return this.sendMail(todolistItems)
  }

  /**
   * Décide d'envoyé un mail ou non
   * @param todolistItems 
   */
  sendMail(items: Item[]) {
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
  
}
