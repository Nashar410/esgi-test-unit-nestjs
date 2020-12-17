import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Item } from 'src/item/entities/item.entity';
import { Todolist } from 'src/todolist/entities/todolist.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CanUserCreateItemGuard } from './can-user-create-item.guard';

describe('CanUserCreateItemGuard', () => {
  
  let canUserCreateItemGuard: CanUserCreateItemGuard;
  let userService;
  let todolist: Todolist;
  let user: User;
  let itemsList: Item[];
  let item: Item;
  let context: ExecutionContext;

  class UserServiceFake {
    async isValid() { return false }
    
   }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useClass: UserServiceFake,
        }
      ]
    }).compile();

    // Services and mocking
    userService = module.get<UserService>(UserService);
    canUserCreateItemGuard = new CanUserCreateItemGuard(userService);

    // data
    todolist = new Todolist({
      id: `c22fcc3d-aeb1-4d66-bc5c-747cce744ed0`,
      items : itemsList
    });
    user = new User({
      birthDate: new Date(1980,11,30),
      email: "toto@toto.fr",
      firstname: "toto",
      id: "9bbf437c-3308-4ece-93e3-8b1745e7760b",
      isValid: undefined,
      lastname: "tata",
      password: "regsgdsgrdsg",
      todolist
    });

  });

  it('should instanciate', async () => {
    expect(canUserCreateItemGuard).toBeDefined();
  });


  it('should let the user create an item', async () => {

    jest.spyOn(userService, 'isValid').mockImplementation(() => user);
    expect(await canUserCreateItemGuard.resolve(user)).toBeTruthy();
  });

  it(`shouldn't let the user create an item because it's not valid`, async () => {
    jest.spyOn(userService, 'isValid').mockImplementation(() => { throw new Error('ok')});
    await expect(canUserCreateItemGuard.resolve(user)).rejects.toThrow('ok');
  });

});
