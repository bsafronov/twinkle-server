import { BaseEntity } from 'src/modules/entity/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Wall } from 'src/modules/wall/entities/wall.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';
import { PostComment } from './post-comments.entity';
import { PostContent } from './post-content.entity';
import { PostLike } from './post-likes.entity';

@Entity()
export class Post extends BaseEntity {
  @ManyToOne(() => User, (user) => user.posts)
  user: Relation<User>;

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  likes: Relation<PostLike[]>;

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  comments: Relation<PostComment[]>;

  @ManyToMany(() => Wall, (wall) => wall.posts, { cascade: true })
  @JoinTable({ name: 'post_wall' })
  walls: Relation<Wall[]>;

  @OneToMany(() => PostContent, (postContent) => postContent.post, {
    cascade: true,
  })
  content: Relation<PostContent[]>;
}
