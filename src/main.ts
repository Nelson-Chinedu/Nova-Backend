import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix('/api/v1/');

  const config = new DocumentBuilder()
    .setTitle('Nova HR - API')
    .setDescription(
      'Api documentation for Nova HR - The all in one - smart managgement tool',
    )
    .setVersion('1.0')
    .addCookieAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
