import { IsDate, IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from "class-validator";
import { Constants } from "src/shared/constants";
import { IsUserHaveMinimumAge } from "src/shared/validators/match-minimum-age.validator";
import { Todolist } from "src/todolist/entities/todolist.entity";
import { User } from "../entities/user.entity";


export class CreateUserDto {

    @IsUUID('all', {
        message: Constants.ERROR_MSG_IS_UUID
    })
    @IsString({
        message: Constants.ERROR_MSG_IS_STRING
    })
    @IsNotEmpty({
        message: Constants.ERROR_MSG_IS_NOT_EMPTY
    })
    id: string;

    @IsEmail({ allow_display_name : false }, {
        message: Constants.ERROR_MSG_IS_EMAIL
    })
    @IsString({
        message: Constants.ERROR_MSG_IS_STRING
    })
    @IsNotEmpty({
        message: Constants.ERROR_MSG_IS_NOT_EMPTY
    })
    email: string;

    @Length(Constants.MIN_PWD_STR, Constants.MAX_PWD_STR, {
        message: Constants.ERROR_MSG_LENGTH_PWD
    })
    @IsString({
        message: Constants.ERROR_MSG_IS_STRING
    })
    password: string;

    @IsString({
        message: Constants.ERROR_MSG_IS_STRING
    })
    @IsNotEmpty({
        message: Constants.ERROR_MSG_IS_NOT_EMPTY
    })
    firstname: string;

    @IsString({
        message: Constants.ERROR_MSG_IS_STRING
    })
    @IsNotEmpty({
        message: Constants.ERROR_MSG_IS_NOT_EMPTY
    })
    lastname: string;

    @IsUserHaveMinimumAge({
        message: Constants.ERROR_MSG_USER_WRONG_AGE
    })
    @IsDate({
        message: Constants.ERROR_MSG_IS_DATE
    })
    @IsNotEmpty({
        message: Constants.ERROR_MSG_IS_NOT_EMPTY
    })
    birthDate: Date;

    @IsOptional()
    isValid?: boolean;

    @IsOptional() 
    todolist: Todolist;

    constructor(user : Partial<User>) {
        Object.assign(this,user);
    }
}
