import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { PostComment } from '../post/entities/post-comments.entity';
import { PostContent } from '../post/entities/post-content.entity';
import { PostLike } from '../post/entities/post-likes.entity';
import { Post } from '../post/entities/post.entity';
import { PostsModule } from '../post/post.module';
import { AuthModule } from '../security/auth/auth.module';
import { TokenModule } from '../security/token/token.module';
import { User } from '../user/entities/user.entity';
import { UsersModule } from '../user/user.module';
import { WallOptions } from '../wall/entities/wall-options.entity';
import { Wall } from '../wall/entities/wall.entity';
import { WallModule } from '../wall/wall.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cfvp0dl269v0ptn1sg9g-a.frankfurt-postgres.render.com',
      port: 5432,
      username: 'bogdasafronov',
      password: 'IGNLO0Bhf6EDU4CV8qtKym9Akb3brBzl',
      database: 'twinkle_5jqb',
      entities: [
        User,
        Post,
        PostContent,
        Wall,
        WallOptions,
        PostLike,
        PostComment,
      ],
      ssl: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    PostsModule,
    WallModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
