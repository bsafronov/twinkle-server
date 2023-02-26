import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../security/guards/jwtAuthGuard';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 9 },
      { name: 'audio', maxCount: 3 },
    ]),
  )
  uploadFiles(@Req() request) {
    const { audio, image } = request.files;
    const { text, wall } = request.body;
    const user = request.user;
    return this.postService.createPost(user.id, wall, text, audio, image);
  }
}
