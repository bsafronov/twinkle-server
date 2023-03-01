import { BaseEntity } from 'src/modules/entity/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToOne, Relation } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostComment extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.comments)
  post: Relation<Post>;

  @ManyToOne(() => User, (user) => user.comments)
  user: Relation<User>;
}
