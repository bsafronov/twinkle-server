import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WallOptions } from './entities/wall-options.entity';
import { Wall } from './entities/wall.entity';
import { WallController } from './wall.controller';
import { WallService } from './wall.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wall, WallOptions])],
  controllers: [WallController],
  providers: [WallService],
  exports: [WallService],
})
export class WallModule {}
