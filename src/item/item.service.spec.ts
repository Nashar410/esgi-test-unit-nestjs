import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { MailerService } from 'src/shared/services/mailer/mailer.service';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { TodolistService } from 'src/todolist/todolist.service';
import { User } from 'src/user/entities/user.entity';
import { Item } from './entities/item.entity';
import { ItemModule } from './item.module';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { Constants } from '../shared/constants';

/** Fake Class */
class TodoListServiceFake {}
class MailerServiceFake {}
class ItemRepositoryFake {}
class ItemServiceFake {}

/** Test */
describe('ItemService', () => {
  // Initialisation des services et fake class
  let service: ItemService;
  let todolistServiceFake;
  let mailerServiceFake;
  let itemRepositoryFake;

  // Mocking et jeu de données
  let mockTodo;
  let item99;
  let items;
  let itemsCharged;
  let itemValid: Item = new Item();
  let itemInvalid: Item = new Item();

  // Avant chaque tests
  beforeEach(async () => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
    jest.clearAllMocks();
    // Export des modules/partie de l'application
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ItemModule],
      providers: [
        //Mocking des services à tester
        ItemService,
        {
          provide: getRepositoryToken(Item), // Mocking du reposiroty de TypeORM
          useClass: ItemRepositoryFake,
        },
        {
          provide: TodolistService,
          useClass: TodoListServiceFake,
        },
        {
          provide: MailerService,
          useClass: MailerServiceFake,
        },
      ],
    }).compile();

    // Service & mocking
    service = module.get<ItemService>(ItemService);
    todolistServiceFake = module.get<TodolistService>(TodolistService);
    mailerServiceFake = module.get<MailerService>(MailerService);
    itemRepositoryFake = module.get(getRepositoryToken(Item));

    // data
    mockTodo = new Todolist({ id: '1' });

    itemInvalid = new Item({
      createdDate: new Date(),
      todolist: mockTodo,
    });

    itemValid = new Item({
      createdDate: new Date('04 Dec 1995 00:12:00 GMT'),
      todolist: mockTodo,
    });

    item99 = new Item({
      id: 'fa65a008-ee7c-421b-8ead-756bffcf48fb',
      name: '3',
      content: 'e',
      createdDate: new Date(),
      todolist: mockTodo,
    });

    items = [];

    itemsCharged = [
      {
        id: '10',
        name: 'd',
        content: 'e',
        createdDate: new Date(),
        todolist: mockTodo,
      },
      {
        id: '2',
        name: '999',
        content: '7777e',
        createdDate: new Date(),
        todolist: mockTodo,
      },
    ];
  });

  // Tests
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Cas content supérieur à 1000 caractères', async () => {
    const item1 = new Item({
      id: 'fa65a008-ee7c-421b-8ead-756bffcf48fb',
      name: 'zza',
      content: new Array(+Constants.MAX_CONTENT_LENGTH_STR).join('abc'),
      createdDate: new Date(),
      todolist: mockTodo,
    });

    await expect(service.isItemContentLength(item1)).rejects.toThrow(
      Constants.ERROR_MSG_LENGTH_CONTENT,
    );
  });

  it('Cas pas de content', async () => {
    const item1 = new Item({
      id: 'fa65a008-ee7c-421b-8ead-756bffcf48fb',
      name: 'zza',
      content: '',
      createdDate: new Date(),
      todolist: mockTodo,
    });

    expect(await service.isItemContentLength(item1)).toBeFalsy();
  });

  it('Cas inférieur à 1000 caractère', async () => {
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => []);

    const item1 = new Item({
      id: 'fa65a008-ee7c-421b-8ead-756bffcf48fb',
      name: 'zza',
      content: 'ddddd',
      createdDate: new Date(),
      todolist: mockTodo,
    });

    expect(await service.isItemContentLength(item1)).toBeTruthy();
  });

  it(`Devrait envoyer un mail`, () => {
    mockTodo.user = new User({ email: 'a' });
    for (let ind = 0; ind < 8; ind++) {
      items.push({
        id: `${ind}`,
        name: `a${ind}`,
        content: 'e',
        createdDate: new Date(),
        todolist: mockTodo,
      });
    }
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => items);
    jest
      .spyOn(mailerServiceFake, 'sendMail')
      .mockImplementationOnce(() => true);
    expect(service.sendMail('1')).toBeTruthy();
  });

  it(`Devrait ne pas envoyer de mail`, async () => {
    for (let ind = 0; ind < 7; ind++) {
      items.push({
        id: `${ind}`,
        name: `a${ind}`,
        content: 'e',
        createdDate: new Date(),
        todolist: new Todolist({}),
      });
    }
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => items);
    jest
      .spyOn(mailerServiceFake, 'sendMail')
      .mockImplementationOnce(() => true);
    expect(await service.sendMail('1')).toBeFalsy();
  });

  it(`Devrait créer un item`, async () => {
    for (let ind = 0; ind < 9; ind++) {
      items.push({
        id: `${ind}`,
        name: 'b',
        content: 'e',
        createdDate: new Date(),
        todolist: new Todolist({}),
      });
    }
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => items);
    expect(
      await service.isItemNumberExceed(new CreateItemDto(item99)),
    ).toBeUndefined();
  });

  it(`Devrait ne pas créer d'item`, async () => {
    for (let ind = 0; ind < 10; ind++) {
      items.push({
        id: `${ind}`,
        name: 'c',
        content: 'e',
        createdDate: new Date(),
        todolist: new Todolist({}),
      });
    }
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => items);
    await expect(
      service.isItemNumberExceed(new CreateItemDto(item99)),
    ).rejects.toThrow(Constants.ERROR_MSG_LIMIT_ITEM_EXCEED);
  });

  it('Cas Date trop récente - invalide ', async () => {
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => itemsCharged);
    jest
      .spyOn(itemRepositoryFake, 'find')
      .mockImplementationOnce(() => [itemInvalid]);
    expect(
      await service.isItemTimeLimit(new CreateItemDto(itemInvalid)),
    ).toBeUndefined();
  });

  it('Cas Date autorisant de continuer - valide', async () => {
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => itemsCharged);
    jest
      .spyOn(itemRepositoryFake, 'find')
      .mockImplementationOnce(() => [itemValid]);
    await expect(
      service.isItemTimeLimit(new CreateItemDto(itemValid)),
    ).rejects.toThrow(Constants.ERROR_MSG_LIMIT_BETWEEN_ITEM_CREATION);
  });

  it(`Devrait dire que l'item est unique`, async () => {
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => []);
    expect(await service.isItemUniqueInTodolist(item99)).toBeTruthy();
  });

  it(`Devrait dire que l'item n'est pas unique`, async () => {
    jest
      .spyOn(todolistServiceFake, 'findAllItems')
      .mockImplementationOnce(() => [...itemsCharged, item99]);
    await expect(service.isItemUniqueInTodolist(item99)).rejects.toThrow(
      Constants.ERROR_MSG_ITEM_NAME_NOT_UNIQUE,
    );
  });
});
