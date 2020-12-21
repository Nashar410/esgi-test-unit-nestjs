import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";
import { Constants } from "src/shared/constants";
import { IsItemNameUnique } from "src/shared/validators/item-name-unique.validator";
import { Todolist } from "src/todolist/entities/todolist.entity";
import { Item } from "../entities/item.entity";

export class CreateItemDto {

    @IsUUID('all', {message: Constants.ERROR_MSG_IS_UUID})
    @IsString({message: Constants.ERROR_MSG_IS_STRING})
    @IsNotEmpty({message: Constants.ERROR_MSG_IS_NOT_EMPTY})
    id: string;

    @IsItemNameUnique({message: Constants.ERROR_MSG_ITEM_NAME_NOT_UNIQUE})
    @IsString({message: Constants.ERROR_MSG_IS_STRING})
    @IsNotEmpty({message: Constants.ERROR_MSG_IS_NOT_EMPTY})
    name: string;

    @Length(
        Constants.MIN_CONTENT_LENGTH_STR,
        Constants.MAX_CONTENT_LENGTH_STR,
        { message: Constants.ERROR_MSG_LENGTH_CONTENT })
    @IsString({message: Constants.ERROR_MSG_IS_STRING})
    @IsNotEmpty({message: Constants.ERROR_MSG_IS_NOT_EMPTY})
    content: string;

    @IsNotEmpty({message: Constants.ERROR_MSG_IS_NOT_EMPTY})
    todolist: Todolist;    

    constructor(item?: Partial<Item>) {
        if (!!item) {
            Object.assign(this, item)
        }
    }

}
