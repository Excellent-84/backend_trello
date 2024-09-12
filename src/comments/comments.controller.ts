import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../guards/user.guard';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ColumnGuard } from '../guards/column.guard';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CardGuard } from '../guards/card.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentGuard } from '../guards/comment.guard';

@ApiTags('Комментарии')
@UseGuards(JwtAuthGuard, UserGuard, ColumnGuard, CardGuard)
@UsePipes(ParseIntPipe)
@Controller('users/:userId/columns/:columnId/cards/:cardId/comments')
export class CommentsController {

  constructor(private readonly commentsService: CommentsService) {}

	@ApiOperation({ summary: 'Создать комментарий' })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  async create(@Param('cardId') cardId: number, @Body() dto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.createComment(dto, cardId);
  }

  @ApiOperation({ summary: 'Получить все комментарии' })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get()
  async findAll(@Param('cardId') cardId: number): Promise<Comment[]> {
    return this.commentsService.getComments(cardId);
  }

  @ApiOperation({ summary: 'Получить комментарий по id' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(CommentGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.getCommentById(id);
  }

  @ApiOperation({ summary: 'Обновить комментарий' })
  @ApiResponse({ status: 200, type: Comment })
  @UseGuards(CommentGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCommentDto): Promise<Comment> {
    return this.commentsService.updateComment(id, dto);
  }

  @ApiOperation({ summary: 'Удалить комментарий' })
  @HttpCode(204)
  @UseGuards(CommentGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.commentsService.deleteComment(id);
  }
}
