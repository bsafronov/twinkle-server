import { Post } from 'src/modules/post/entities/post.entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { WallOptions } from './wall-options.entity';

@Entity()
export class Wall {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, (user) => user.walls)
  owner: Relation<User>;

  @OneToOne(() => WallOptions, (wallOptions) => wallOptions.wall, {
    cascade: true,
  })
  @JoinColumn()
  options: Relation<WallOptions>;

  @ManyToMany(() => Post, (post) => post.walls)
  posts: Relation<Post[]>;
}
