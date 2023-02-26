import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Wall } from './wall.entity';

export enum WallTypes {
  PERSONAL = 'person',
  GROUP = 'group',
}

@Entity()
export class WallOptions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ enum: WallTypes, default: WallTypes.PERSONAL })
  type: WallTypes;

  @OneToOne(() => Wall, (wall) => wall.options)
  wall: Relation<Wall>;
}
