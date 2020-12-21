import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { DatabaseModule } from 'src/database/database.module';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { TodolistService } from 'src/todolist/todolist.service';
import { User } from 'src/user/entities/user.entity';
import { Item } from './entities/item.entity';
import { ItemModule } from './item.module';
import { ItemService } from './item.service';
import { CreateItemDto } from "./dto/create-item.dto";
import { Constants } from "../shared/constants";

class TodoListServiceFake{}

class MailerServiceFake {}
class ItemRepositoryFake {}

describe('ItemService', () => {
  let service: ItemService;
  let todolistServiceFake;
  let mailerServiceFake;
  let itemRepositoryFake;
  let mockTodo;
  let item;
  let itemValid: Item = new Item();
  let itemInvalid: Item = new Item();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ItemModule],
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: ItemRepositoryFake
        },
        {
          provide: TodolistService,
          useClass: TodoListServiceFake
        },
        {
          provide: MailerService,
          useClass: MailerServiceFake
        }
      ],
    }).compile();

    // Service & mocking
    service = module.get<ItemService>(ItemService);
    todolistServiceFake = module.get<TodolistService>(TodolistService);
    mailerServiceFake = module.get<MailerService>(MailerService);
    itemRepositoryFake = module.get(getRepositoryToken(Item));

    // data
    mockTodo = new Todolist({id: "1"});


    itemInvalid.createdDate = new Date();
    itemInvalid.todolist = new Todolist({id:"1"});
    itemValid.createdDate = new Date('04 Dec 1995 00:12:00 GMT');
    itemValid.todolist = new Todolist({id:"1"});
    item = new Item({
      id: "fa65a008-ee7c-421b-8ead-756bffcf48fb",
      name: "zza",
      content: "e",
      createdDate: new Date(),
      todolist: mockTodo,
    });

    jest.spyOn(todolistServiceFake, "findAllItems").mockImplementation(() => [
      {
        id: "10",
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: mockTodo,
      },
      {
        id: "2",
        name: "999",
        content: "7777e",
        createdDate: new Date(),
        todolist: mockTodo,
      }
    ]);


  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should say that the item is unique', async () => {
    expect(await service.isItemUniqueInTodolist(item)).toBeTruthy();
  });

  it('should say that the item isnt unique', async () => {
    jest.spyOn(todolistServiceFake, "findAllItems").mockImplementation(() => [
      {
        id: "10",
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: undefined,
      },
      {
        id: "2",
        name: "999",
        content: "7777e",
        createdDate: new Date(),
        todolist: undefined,
      },
      {
        id: "1",
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: mockTodo,
      },
      item
    ]);

    expect(await service.isItemUniqueInTodolist(item)).toBeFalsy();
  });

  it('should send mail', () => {

    const items: Item[] = [];
    mockTodo.user = new User({email : "a"});

    for (let ind = 0; ind < 8; ind++) {
      items.push({
        id: `${ind}`,
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: mockTodo
      })
    }
      jest.spyOn(todolistServiceFake, "findAllItems").mockImplementation(() => items);
      jest.spyOn(mailerServiceFake, "sendMail").mockImplementation(() => true);
      expect(service.sendMail("1")).toBeTruthy();
  });

  it('should sendn\'t mail', async () => {

    const items: Item[] = [];
    for (let ind = 0; ind < 7; ind++){
      items.push({
        id: `${ind}`,
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: new Todolist({})
      })
    }
    jest.spyOn(todolistServiceFake, "findAllItems").mockImplementation(() => items);
    jest.spyOn(mailerServiceFake, "sendMail").mockImplementation(() => true);
    expect(await service.sendMail("1")).toBeFalsy();
  });

  it('should create item', async () => {

    const items: Item[] = [];
    for (let ind = 0; ind < 9; ind++){
      items.push({
        id: `${ind}`,
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: new Todolist({})
      })
    }
    jest.spyOn(todolistServiceFake, "findAllItems").mockImplementation(() => items);
    expect(await service.isItemBeCreated(new CreateItemDto(item))).toBeUndefined();
  });

  it('shouldn\'t create item', async () => {

    const items: Item[] = [];
    for (let ind = 0; ind < 10; ind++){
      items.push({
        id: `${ind}`,
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: new Todolist({})
      })
    }
    jest.spyOn(todolistServiceFake, "findAllItems").mockImplementation(() => items);
    await expect(service.isItemBeCreated(new CreateItemDto(item))).rejects.toThrow(Constants.ERROR_MSG_LIMIT_ITEM_EXCEED);
  });

  it("Cas Date trop récente - invalide ", async () => {
    jest.spyOn(itemRepositoryFake, 'find').mockImplementation(() => [itemInvalid]);
    expect(await service.isItemTimeLimit(new CreateItemDto(itemInvalid))).toBeUndefined();
  });

  it("Cas Date autorisant de continuer - valide", async () => {
    jest.spyOn(itemRepositoryFake, 'find').mockImplementation(() => [itemValid]);
    await expect( service.isItemTimeLimit(new CreateItemDto(itemValid))).rejects.toThrow(Constants.ERROR_MSG_LIMIT_BETWEEN_ITEM_CREATION);
  });

  it("Cas content supérieur à 1000 caractère", async () => {
   let item = new Item({
      id: "fa65a008-ee7c-421b-8ead-756bffcf48fb",
      name: "zza",
      content: new Array(1000).join("abc"),
      createdDate: new Date(),
      todolist: mockTodo,
    });
    expect(await service.isValid(item)).toBeUndefined();
  });

  it("Cas inférieur à 1000 caractère", async () => {
    let item = new Item({
      id: "fa65a008-ee7c-421b-8ead-756bffcf48fb",
      name: "zza",
      content: "sdgss",
      createdDate: new Date(),
      todolist: mockTodo,
    });
    await expect(service.isValid(item)).rejects.toThrow(Constants.ERROR_MSG_LENGTH_CONTENT);
  });
});
