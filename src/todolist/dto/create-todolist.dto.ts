import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Item } from 'src/item/entities/item.entity';
import { Constants } from 'src/shared/constants';
import { User } from 'src/user/entities/user.entity';

export class CreateTodolistDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: User;

  @MaxLength(Constants.MAX_ITEM_LENGTH)
  @IsOptional()
  items: Item[];
}
