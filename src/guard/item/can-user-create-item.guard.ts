import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CanUserCreateItemGuard implements CanActivate {

  constructor(private userService: UserService) {
    
  }
  async canActivate(
    context: ExecutionContext,
  ){

    // Get de l'user
    const user = await this.userService.findOne(
      context
        .switchToHttp()
        .getRequest()
        .params.createItemDto.todolist.user.id
    );

    // SI l'user existe, on return s'il est valide ou non
    // SI l'user n'existe pas, il n'a pas le droit, on return false
    return !!user ? !!(await this.userService.isValid(user)) : false;



  }
}
