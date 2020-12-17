import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Todolist } from "../todolist/entities/todolist.entity";
import { AppModule } from 'src/app.module';
import { Constants } from 'src/shared/constants';
import { UserModule } from './user.module';
import { ItemModule } from 'src/item/item.module';

class UserRepositoryFake{}

describe('UserService', () => {
  let service: UserService;
  let mockUser;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule, ItemModule],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryFake
        }],
    }).compile();

    service = module.get<UserService>(UserService);

    const mockTodo = new Todolist({id: "8aaf437c-3308-4ece-93e3-8b1745e7760a"});

    mockUser = {
      birthDate: new Date(1980,11,30),
      email: "toto@toto.fr",
      firstname: "toto",
      id: "9bbf437c-3308-4ece-93e3-8b1745e7760b",
      isValid: undefined,
      lastname: "tata",
      password: "regsgdsgrdsg",
      todolist: mockTodo
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be ok : right user', async () => {
    expect(await service.isValid(mockUser) === mockUser).toBeTruthy();
  });

  it('shouldn\'t valid : Bad mail', async () => {
    mockUser.email = "a";
    await expect(service.isValid(mockUser)).rejects.toThrow(Constants.ERROR_MSG_IS_EMAIL);
  });

  it('shouldn\'t valid : Bad id - none UUID', async () => {
    mockUser.id = "a";
    await expect(service.isValid(mockUser)).rejects.toThrow(Constants.ERROR_MSG_IS_UUID);
  });

  it('shouldn\'t valid : Bad birthdate - wrong type', async () => {
    mockUser.birthDate = "a";
    await expect(service.isValid(mockUser)).rejects.toThrow(Constants.ERROR_MSG_IS_DATE);
  });

  it('shouldn\'t valid : Bad birthdate - far too young', async () => {
    mockUser.birthDate = new Date(2020, 10, 12);
    await expect(service.isValid(mockUser)).rejects.toThrow(Constants.ERROR_MSG_USER_WRONG_AGE);
  });

  it('shouldn\'t valid : Bad birthdate - too young at one day', async () => {
    let birthDate = new Date();

    birthDate.setFullYear(birthDate.getFullYear() - Constants.AGE_LIMIT);

    // Add 3 day to the birth day, it means the the user will have 13 in 3 day
    birthDate.setDate(birthDate.getDate() + 3);
    mockUser.birthDate = birthDate;
    await expect(service.isValid(mockUser)).rejects.toThrow(Constants.ERROR_MSG_USER_WRONG_AGE);
  });
});
