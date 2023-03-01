import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/entity/base.entity';
import { PostComment } from 'src/modules/post/entities/post-comments.entity';
import { PostLike } from 'src/modules/post/entities/post-likes.entity';
import { Post } from 'src/modules/post/entities/post.entity';
import { Wall } from 'src/modules/wall/entities/wall.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Wall, (wall) => wall.owner)
  walls: Relation<Wall[]>;

  @OneToMany(() => Post, (post) => post.user)
  posts: Relation<Post[]>;

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  comments: Relation<PostComment[]>;

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  likes: Relation<PostLike[]>;
}
