import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ColumnsService } from "../columns/columns.service";
import { UsersService } from "./users.service";
import { CardsService } from "../cards/cards.service";

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly columnsService: ColumnsService,
    private readonly cardsService: CardsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const { id: pathId, userId: pathUserId } = request.params;

    // console.log('userId: ', userId);
    // console.log('pathId: ', pathId);
    // console.log('pathUserId: ', pathUserId);
    // console.log('params: ', request.params);

    if  (pathUserId || pathId) {
      const userToCheck = await this.usersService.getUserById(+pathUserId || +pathId);
      // console.log('userToCheck: ', userToCheck);
      if (userToCheck.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этому ресурсу');
      }
    }

    // if  (pathUserId && pathId) {
    //   const columnToCheck = await this.columnsService.getColumnById(+pathUserId || +pathId);
    //   console.log('columnToCheck: ', columnToCheck);
    //   if (columnToCheck.id !== request.column.user.id) {
    //     throw new ForbiddenException('У вас нет доступа к этому ресурсу');
    //   }
    // }
    // const userId = request.user.id;
    // const params = request.params;
    // const pathId = +request.params.id
    // const pathUserId = +request.params.userId;
    // const pathColumnId = +request.params.columnId;

    // console.log('request.headers: ', request.route.path.split('/').pop());
    // console.log('params: ', params);
    // console.log('pathId: ', pathId);
    // console.log('pathUserId: ', pathUserId);
    // console.log('pathColumnId: ', pathColumnId);
    // console.log('userId: ', userId);

    // if (pathUserId && pathColumnId) {
    //   const column = await this.columnsService.getColumnById(pathColumnId);
    //   console.log('column: ', column);
    //   if (column.id !== pathColumnId) {
    //     throw new ForbiddenException('У вас нет доступа к этой карточке');
    //   }
    // }

    // else if (pathId && pathUserId && pathColumnId) {
    //   if (pathId) {
    //     const card = await this.cardsService.getCardById(pathId);
    //     console.log('card: ', card);
    //     if (card.column.id !== pathColumnId) {
    //       throw new ForbiddenException('У вас нет доступа к этой карточке');
    //     }
    //   }
    // }

    // else if (pathId && pathUserId) {
    //   const column = await this.columnsService.getColumnById(pathId);
    //   console.log('column: ', column);
    //   if (column.user.id !== pathUserId || column.user.id !== pathId) {
    //     throw new ForbiddenException('У вас нет доступа к этой колонке');
    //   }
    // }

    // else if (pathId || pathUserId) {
    //   if (pathId) {
    //     const user = await this.usersService.getUserById(pathId);
    //     console.log('user: ', user);
    //     if (user.id !== userId) {
    //       throw new ForbiddenException('У вас нет доступа к этому пользователю');
    //     }
    //   }
    //   else {
    //     const user = await this.usersService.getUserById(pathUserId);
    //     console.log('user: ', user);
    //     if (user.id !== userId) {
    //       throw new ForbiddenException('У вас нет доступа к этому пользователю');
    //     }
    //   }
    // }

    return true;
  }
}

// @Injectable()
// export class OwnerGuard implements CanActivate {
//   constructor(
//     private readonly usersService: UsersService,
//     private readonly columnsService: ColumnsService,
//     private readonly cardsService: CardsService
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const userId = request.user.id;
//     const { id: pathId, userId: pathUserId, columnId: pathColumnId } = request.params;
//     const params = request.params;

//     console.log('params: ', params);
//     console.log('pathId: ', pathId);
//     console.log('pathUserId: ', pathUserId);
//     console.log('pathColumnId: ', pathColumnId);
//     console.log('userId: ', userId);

//     // Проверяем, есть ли доступ к колонке
//     if (pathColumnId) {
//       const column = await this.columnsService.getColumnById(+pathColumnId);
//       console.log('column: ', column);
//       if (column.user.id !== pathUserId) {
//         throw new ForbiddenException('У вас нет доступа к этой колонке');
//       }
//     }

//     // Проверяем, есть ли доступ к карточке
//     if (pathId) {
//       const card = await this.cardsService.getCardById(+pathId);
//       console.log('card: ', card);
//       if (card.column.id !== +pathColumnId) {
//         throw new ForbiddenException('У вас нет доступа к этой карточке');
//       }
//     }

//     // Проверяем, есть ли доступ к пользователю
//     if (pathId || pathUserId) {
//       const userToCheck = await this.usersService.getUserById(+pathId || +pathUserId);
//       console.log('userToCheck: ', userToCheck);
//       if (userToCheck.id !== userId) {
//         throw new ForbiddenException('У вас нет доступа к этому пользователю');
//       }
//     }

//     return true;
//   }
// }
