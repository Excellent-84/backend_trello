import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comments.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>
  ) {}

  async createComment(dto: CreateCommentDto, cardId: number): Promise<Comment> {
    const [newComment] = await this.commentsRepository.query(
      `INSERT INTO comments (content, "cardId") VALUES ($1, $2) RETURNING * `,
      [dto.content, cardId]
    );
    return newComment;
  }

  async getComments(cardId: number): Promise<Comment[]> {
    const comments = await this.commentsRepository.query(
      `SELECT * FROM comments WHERE "cardId" = $1`,
      [cardId]
    )
    return comments.map(comment => ({ ...comment, card: { id: comment.cardId } }));
  }

  async getCommentById(id: number): Promise<Comment> {
    const [comment] = await this.commentsRepository.query(
      `SELECT com.*, car."columnId", col."userId"
       FROM comments com
       JOIN cards car ON com."cardId" = car.id
       JOIN columns col ON car."columnId" = col.id
       WHERE com.id = $1`,
      [id]
    );

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    return {  ...comment,
      card: { id: comment.cardId,
        column: { id: comment.columnId,
          user: { id: comment.userId }
        }
      }
    };
  }

  async updateComment(id: number, dto: UpdateCommentDto): Promise<Comment> {
    await this.getCommentById(id);

    const [updateComment] = await this.commentsRepository.query(
      'UPDATE comments SET content = $1 WHERE id = $2 RETURNING * ',
      [dto.content, id]
    );
    return updateComment[0];
  }

  async deleteComment(id: number): Promise<void> {
    await this.getCommentById(id)

    await this.commentsRepository.query(
      'DELETE FROM comments WHERE id = $1', [id]
    );
  }
}
