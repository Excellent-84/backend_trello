import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { CommentsService } from "../comments/comments.service";

@Injectable()
export class CommentGuard implements CanActivate {

  constructor(private readonly commentsService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const pathId = +req.params.id;

    if (pathId) {
      const comment = await this.commentsService.getCommentById(pathId);

      if (comment.card.column.user.id !== userId) {
        throw new ForbiddenException('У вас нет доступа к этому комментарию');
      }
    }
    return true;
  }
}
