import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileService, FileType } from '../file/file.service';
import { WallService } from '../wall/wall.service';
import { PostContent } from './entities/post-content.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(PostContent)
    private postContentRepository: Repository<PostContent>,
    private readonly fileService: FileService,
    private readonly wallService: WallService,
  ) {}

  async createPost(id, wall_id, text, audio, image) {
    let content = [];

    if (text) {
      const text1 = this.postContentRepository.create({ desc: text });
      content.push(text1);
    }

    for (const el of audio) {
      const audioPath = this.fileService.createFile(FileType.AUDIO, el);
      const audio = this.postContentRepository.create({ desc: audioPath });
      content.push(audio);
    }

    for (const el of image) {
      const imagePath = this.fileService.createFile(FileType.IMAGE, el);
      const image = this.postContentRepository.create({ desc: imagePath });
      content.push(image);
    }
    const wall = await this.wallService.findOneById(wall_id);

    const post = this.postRepository.save({
      content: content,
      user: id,
      walls: [wall],
    });

    return post;
  }
}
