import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/_app/app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = config.PORT || 4000;

  await app.listen(PORT, () => console.log('Server started on port ' + PORT));
}
bootstrap();
