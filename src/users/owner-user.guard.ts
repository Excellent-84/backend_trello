import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Columns } from "../columns/columns.entity";

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const entity = await this.getEntity(request);
    console.log('entity:', entity)

    if (!entity) {
      throw new HttpException('Сущность не найдена', HttpStatus.NOT_FOUND);
    }

    if (entity.user.id === user.id) {
      return true;
    }

    throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
  }

  // private async getEntity(request: any): Promise<Columns | Card | Comment | null> {
  private async getEntity(request: any): Promise<Columns | null> {
    const entityType = this.reflector.get<string>('entity', request.route.path);
    console.log('entityType:', entityType)

    switch (entityType) {
      case 'columns':
        return await request.service.getColumnById(request.params.id);
      // case 'cards':
      //   return await request.service.getCardById(request.params.id);
      // case 'comments':
      //   return await request.service.getCommentById(request.params.id);
      default:
        return null;
    }
  }
}
