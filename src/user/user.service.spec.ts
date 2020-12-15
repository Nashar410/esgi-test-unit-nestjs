import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Todolist } from "../todolist/entities/todolist.entity";

class MailerServiceFake {}
class ItemReposirotyFake {}

describe('UserService', () => {
  let service: UserService;
  let userRepositoryFake;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,
        {
          provide: getRepositoryToken(User),
          useClass: userRepositoryFake
        }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async ()=> {
    const mockTodo = new Todolist();
    mockTodo.id = "1";

    const mockUser : User = {
      birthDate: new Date(1998,11,30),
      email: "toto@toto.fr",
      firstname: "toto",
      id: "1",
      isValid: true,
      lastname: "tata",
      password: "regsgdsgrdsg",
      todolist: mockTodo

    }
    // jest.spyOn(service, "isValid").mockImplementation(() =>  );
    expect(service.create(mockUser)).toBeDefined();
  });

  it('shouldn\'t valid', async ()=> {
    const mockTodo = new Todolist();
    mockTodo.id = "1";

    const mockUser : User = {
      birthDate: new Date(2020,11,30),
      email: "toto@toto.fr",
      firstname: "toto",
      id: "2",
      isValid: true,
      lastname: "tata",
      password: "regsgdsgrdsg",
      todolist: mockTodo

    }
    jest.spyOn(service, "isValid").mockImplementation(() => false );
    expect(service.create(mockUser)).toBeFalsy();
  });

});
