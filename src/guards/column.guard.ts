import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ColumnsService } from "../columns/columns.service";

@Injectable()
export class ColumnGuard implements CanActivate {

  constructor(private readonly columnsService: ColumnsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const pathId = +req.params.id
    const pathColumnId = +req.params.columnId

    if  (pathColumnId || pathId) {
      const column = await this.columnsService.getColumnById(pathColumnId || pathId);

      if (column.user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этой колонке');
      }
    }
    return true;
  }
}
