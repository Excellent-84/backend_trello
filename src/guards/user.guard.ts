import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const pathId = +req.params.id;
    const pathUserId = +req.params.userId;

    if (pathUserId || pathId) {
      const user = await this.usersService.getUserById(pathUserId || pathId);

      if (user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этому пользователю');
      }
    }

    return true;
  }
}
