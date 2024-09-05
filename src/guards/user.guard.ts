import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const pathId = +request.params.id;
    const pathUserId = +request.params.userId;

    if (pathUserId || pathId) {
      const user = await this.usersService.getUserById(pathUserId || pathId);

      if (user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этому пользователю');
      }
    }

    return true;
  }
}
