import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { IsUserHaveMinimumAge } from "src/shared/validators/match-minimum-age.validator";
import { Todolist } from "src/todolist/entities/todolist.entity";


export class CreateUserDto {

    @IsUUID()
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @Length(8, 40)
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsUserHaveMinimumAge()
    @IsDate()
    @IsNotEmpty()
    birthDate: Date;

    @IsOptional()
    @IsEmpty()
    isValid?: boolean;

    @IsOptional() 
    todolist: Todolist;
}
