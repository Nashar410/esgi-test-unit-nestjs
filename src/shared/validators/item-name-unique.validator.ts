import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Item } from 'src/item/entities/item.entity';
import { ItemService } from 'src/item/item.service';
import { TodolistService } from 'src/todolist/todolist.service';
import { Constants } from '../constants';

/**
 * Validator de l'unicité d'un item dans sa todolist
 * Devient un transformateur avec @IsUserHaveMinimumAge
 */
@ValidatorConstraint({ async: true })
@Injectable()
export class ItemNameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => ItemService))
    protected readonly itemService: ItemService,
  ) {}

  validate(
    itemName: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    console.log(itemName, this.itemService);
    // on interoge le service item
    if (!!this.itemService) {
      console.log('okkkkkkkkkkk');
      return this.itemService.isItemUniqueInTodolist(itemName);
    }
    console.log('ko');
  }
}

/**
 * Création du décorateur pour @ItemNameUniqueConstraint
 * @param validationOptions
 */
export function IsItemNameUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ItemNameUniqueConstraint,
    });
  };
}
