import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { PrismaService } from '../../../../../lib/prisma-shared/prisma.service';
import { EmailModule } from '../email/email.module';

@Module({
  controllers: [CommentController],
  imports: [EmailModule],
  exports: [CommentService],
  providers: [CommentService, PrismaService],
})
export class CommentsModule {}
