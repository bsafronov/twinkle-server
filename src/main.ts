import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/_app/app.module';
import config from './common/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const PORT = config.PORT || 4000;

  await app.listen(PORT, () => console.log('Server started on port ' + PORT));
}
bootstrap();
