import { Test, TestingModule } from '@nestjs/testing';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { Todolist } from 'src/todolist/entities/todolist.entity';
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

  let itemService: ItemService;
  let itemGuard: ItemCreationGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService
      ]
    }).compile()

    itemService = module.get(ItemService);
    itemGuard = new ItemCreationGuard(itemService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it('should be defined', () => {
    expect(new ItemCreationGuard(itemService)).toBeDefined();
  });

  describe("Guard d'Item", () => {

    it("Cas Date trop récente - invalide ", async () => {

      jest.spyOn(itemService, "findLastItemOfTodolist").mockResolvedValue([itemInvalid]);

      expect(await itemGuard.resolve('1')).toBeFalsy();
    });

    it("Cas pas d'item - invalide", async () => {

      jest.spyOn(itemService, "findLastItemOfTodolist").mockResolvedValue([]);

      expect(await itemGuard.resolve('1')).toBeTruthy();
    });

    it("Cas Date autorisant de continuer - valide", async () => {

      jest.spyOn(itemService, "findLastItemOfTodolist").mockResolvedValue([itemValid]);

      expect(await itemGuard.resolve('1')).toBeTruthy();
    });

  })
});
