import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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

  /**
   * Instancie un DTO User qui contient la logique de validation d'un user
   * @param user
   * @throws la liste des erreurs
   * @return user si pas d'erreur, le même objet est retourné
   */
  async isValid(user: User) {
    // récupération des possibles erreurs
    const errors = await validate(new CreateUserDto(user));

    //s'il y a des erreurs
    if (errors.length) {
      // préparation de la réponse final
      let strError = '';

      // Loop sur les erreurs pour les récupérer toutes
      for (const error of errors) {
        // S'il y a des contraintes
        if (!!error.constraints) {
          // Loop sur les contraintes pour les récupérer toutes
          for (const constraint in error.constraints) {
            // concaténer les erreurs à la réponse finales
            strError += `${error.constraints[constraint]}`;
          }
        } else {
          // Des erreurs et pas de contraintes, ne doit jamais arrivé
          // défaillance de la librairie class-validator
          strError += Constants.ERROR_MSG_UNKNOWN_ERROR;
        }
      }
      // Throw d'une erreur avec la réponse finale en message
      throw new Error(strError);
    } else {
      // Pas d'erreur, on return l'user
      return user;
    }
  }
}
