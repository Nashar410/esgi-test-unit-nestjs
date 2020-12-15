import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  

  /**
   * Validate and create and user
   * @param userDto A user ALREADY validate by the DTO logics
   */
  async create(userDto: CreateUserDto) {
    // MDP to cryp
    userDto.password = this.unsecureCryptPassword(userDto.password);
    // Si on est ici, l'user est valid
    userDto.isValid = true;

    return await this.userRepository.create(userDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(users: User[]) {
    return await this.userRepository.remove(users);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  /**
   * Mock de cryptage
   * @deprecated
   * @forbidden
   * @warning
   * @param password 
 */
  private unsecureCryptPassword(unsecureCryptedPassword: string): string {
    return unsecureCryptedPassword + Constants.UNESECURE_SALT;
  }

  /**
  * Decrypt an unsecure password
  * @deprecated
  * @forbidden   
  * @warning
  * @param unsecureCryptPassword 
   */
  public unsecureDecryptPassword(unsecureCryptPassword: string) {
    return unsecureCryptPassword.replace(Constants.UNESECURE_SALT, '');
  }

  isValid(user: User){
    try{
      let dto = new CreateUserDto(user);
      return true;
    } catch (e){
      throw "the exception is " + e;
      return false;
    }
  }

}
