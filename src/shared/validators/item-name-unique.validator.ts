import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Item } from "src/item/entities/item.entity";
import { ItemService } from "src/item/item.service";
import { TodolistService } from "src/todolist/todolist.service";
import { Constants } from "../constants";

/**
 * Validator de l'unicité d'un item dans sa todolist
 * Devient un transformateur avec @IsUserHaveMinimumAge
 */
@ValidatorConstraint({async: true})
export class ItemNameUniqueConstraint implements ValidatorConstraintInterface{

    private itemName: string;

    constructor(private itemService: ItemService) { }
    
    validate(item: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {

        // Préparation pour le message
        this.itemName = item.name;

        // on interoge le service de la todolist
        return this.itemService.isItemUniqueInTodolist(item)         
    }
    
    /**
     * Message par défaut
     * @param validationArguments 
     */
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `Le name "${this.itemName}" est dupliqué dans la todolist`;
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
