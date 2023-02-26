import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WallOptions, WallTypes } from './entities/wall-options.entity';
import { Wall } from './entities/wall.entity';

@Injectable()
export class WallService {
  constructor(
    @InjectRepository(Wall)
    private readonly wallRepository: Repository<Wall>,
    @InjectRepository(WallOptions)
    private readonly wallOptionsRep: Repository<WallOptions>,
  ) {}

  async createWall(user) {
    const options = this.wallOptionsRep.create();
    return await this.wallRepository.save({ owner: user, options });
  }

  async findOneById(id) {
    return await this.wallRepository.findOne({ where: { id } });
  }

  async getUserWall(username) {
    const type = WallTypes.PERSONAL;
    const wall = await this.wallRepository.findOne({
      where: { owner: { username }, options: { type } },
      relations: {
        owner: true,
        posts: { content: true, user: true, comments: true, likes: true },
      },
    });
    return wall;
  }
}
