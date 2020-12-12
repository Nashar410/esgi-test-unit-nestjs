import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator";
import { IsItemNameUnique } from "src/shared/validators/item-name-unique.validator";
import { Todolist } from "src/todolist/entities/todolist.entity";

export class CreateItemDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsItemNameUnique()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Length(1, 1000)
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    todolist: Todolist;    

}
