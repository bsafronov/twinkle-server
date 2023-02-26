import { Controller, Get, Param } from '@nestjs/common';
import { WallService } from './wall.service';

@Controller('wall')
export class WallController {
  constructor(private readonly wallService: WallService) {}

  @Get(':id')
  getUserWall(@Param('id') username) {
    return this.wallService.getUserWall(username);
  }
}
