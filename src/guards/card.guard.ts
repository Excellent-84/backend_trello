import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { CardsService } from "../cards/cards.service";

@Injectable()
export class CardGuard implements CanActivate {

  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const pathId = +request.params.id
    const pathUserId = +request.params.userId;
    const pathColumnId = +request.params.columnId

    console.log('userId: ', userId);
    console.log('pathUserId: ', pathUserId);
    console.log('params: ', request.params);

    if  (pathId) {
      const card = await this.cardsService.getCardById(pathId);
      console.log('card: ', card);
      if (card.column.user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этой карточке');
      }
    }

    return true;
  }
}
