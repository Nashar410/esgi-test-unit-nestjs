import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from 'src/item/entities/item.entity';
import { ItemModule } from 'src/item/item.module';
import { ItemService } from 'src/item/item.service';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { TodolistModule } from 'src/todolist/todolist.module';
import { TodolistService } from 'src/todolist/todolist.service';
import { getRepository } from 'typeorm';
import { ItemCreationGuard } from './item-creation.guard';


const itemInvalid: Item = new Item();
itemInvalid.createdDate = new Date();
itemInvalid.todolist = new Todolist();
itemInvalid.todolist.id = '1';

const itemValid: Item = new Item();
itemValid.createdDate = new Date('04 Dec 1995 00:12:00 GMT');
itemValid.todolist = new Todolist();
itemValid.todolist.id = '1';


describe('ItemCreationGuard', () => {

  class ItemServiceFake {
    currentItemTested: Item[];
    async findLastItemOfTodolist(id){return this.currentItemTested}
  };
  
  let itemGuard: ItemCreationGuard;
  let itemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ItemService,
          useClass: ItemServiceFake
        },
      ]
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemGuard = new ItemCreationGuard(itemService);
  });

  it('should be defined', () => {
    expect(new ItemCreationGuard(itemService)).toBeDefined();
  });

  describe("Guard d'Item", () => {

    it("Cas Date trop récente - invalide ", async () => {

      jest.spyOn(itemService, 'findLastItemOfTodolist').mockImplementation(() => [itemInvalid]);
      expect(await itemGuard.resolve('1')).toBeFalsy();
    });
    
    it("Cas Date autorisant de continuer - valide", async () => {

      jest.spyOn(itemService, 'findLastItemOfTodolist').mockImplementation(() => [itemValid]);
      expect(await itemGuard.resolve('1')).toBeTruthy();
    });

    it("Cas pas d'item - invalide", async () => {

      jest.spyOn(itemService, 'findLastItemOfTodolist').mockImplementation(() => []);
      expect(await itemGuard.resolve('1')).toBeTruthy();
    });


  })
});
