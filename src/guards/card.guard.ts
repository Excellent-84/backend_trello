import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { CardsService } from "../cards/cards.service";

@Injectable()
export class CardGuard implements CanActivate {

  constructor(private readonly cardsService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const pathId = +req.params.id;
    const pathCardId = +req.params.cardId

    if  (pathCardId || pathId) {
      const card = await this.cardsService.getCardById(pathCardId || pathId);

      if (card.column.user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этой карточке');
      }
    }
    return true;
  }
}
