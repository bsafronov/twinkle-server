import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/_app/app.module';
import config from './common/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Twinkle')
    .setDescription('Twinkle API')
    .setVersion('1.0')
    .addTag('API')
    .addTag('Users')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    credentials: true,
    origin: config.CLIENT_URL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const PORT = config.PORT || 4000;

  await app.listen(PORT, () => console.log('Server started on port ' + PORT));
}
bootstrap();
