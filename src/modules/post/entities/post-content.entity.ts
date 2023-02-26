import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostContent {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  desc: string;

  @ManyToOne(() => Post, (post) => post.content)
  post: Relation<Post>;
}
