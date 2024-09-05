import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ColumnsService } from "../columns/columns.service";

@Injectable()
export class ColumnGuard implements CanActivate {

  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const pathId = +request.params.id
    const pathColumnId = +request.params.columnId

    if  (pathColumnId || pathId) {
      const column = await this.columnsService.getColumnById(pathColumnId || pathId);

      if (column.user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этой колонке');
      }
    }

    return true;
  }
}
