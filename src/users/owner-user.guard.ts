import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ColumnsService } from "../columns/columns.service";
import { UsersService } from "./users.service";

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnsService: ColumnsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const params = request.params;
    // const columnId = +request.params.id;
    const pathId = +request.params.id
    const pathUserId = +request.params.userId;

    // console.log('request.headers: ', request.route.path.split('/').pop());
    console.log('params: ', params);
    console.log('pathId: ', pathId);
    console.log('pathUserId: ', pathUserId);
    console.log('userId: ', userId);

    if (pathId && pathUserId) {
      const column = await this.columnsService.getColumnById(pathId);
      console.log('column: ', column);
      if (column.user.id !== pathUserId) {
        throw new ForbiddenException('У вас нет доступа к этой колонке');
      }
    }

    else if (pathId || pathUserId) {
      if (pathId) {
        const user = await this.usersService.getUserById(pathId);
        console.log('user: ', user);
        if (user.id !== userId) {
          throw new ForbiddenException('У вас нет доступа к этому пользователю');
        }
      }
      else {
        const user = await this.usersService.getUserById(pathUserId);
        console.log('user: ', user);
        if (user.id !== userId) {
          throw new ForbiddenException('У вас нет доступа к этому пользователю');
        }
      }
    }

    return true;
  }
}