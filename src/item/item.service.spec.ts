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

class TodoListServiceFake{}

class MailerServiceFake {}
class ItemReposirotyFake {}

describe('ItemService', () => {
  let service: ItemService;
  let todolistServiceFake;
  let mailerServiceFake;
  let mockTodo;
  let item;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ItemModule],
      providers: [
        ItemService,
        {
          provide: getRepositoryToken(Item),
          useClass: ItemReposirotyFake
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

    // data
    item = new Item({
      id: "1",
      name: "a",
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
        todolist: undefined,
      },
      {
        id: "2",
        name: "999",
        content: "7777e",
        createdDate: new Date(),
        todolist: undefined,
      }
    ]);

    //data
    mockTodo = new Todolist({id: "1"});

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should say that the item is unique', async () => {
    expect(await service.isItemUniqueInTodolist(item)).toBeTruthy();
  });

  it('should say that the item isnt unique', () => {
    const item: Item = {
      id: "1",
      name: "a",
      content: "e",
      createdDate: new Date(),
      todolist: mockTodo,
    };
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
      }
    ]);

    expect(service).toBeDefined();
  });

  it('should send mail', () => {

    const items: Item[] = [];
    mockTodo.user = new User({email : "a"});

    for (let ind = 0; ind < 8; ind++){
      items.push({
        id: `${ind}`,
        name: "a",
        content: "e",
        createdDate: new Date(),
        todolist: mockTodo
      })
    }
    jest.spyOn(mailerServiceFake, "sendMail").mockImplementation(() => true);
    expect(service.sendMail(items)).toBeTruthy();
  });

  it('should sendn\'t mail', () => {

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

    expect(service.sendMail(items)).toBeFalsy();
  });

});
