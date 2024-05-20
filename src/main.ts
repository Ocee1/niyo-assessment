import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
import { urlencoded, json } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');
  await app.listen(PORT, () => {
    console.log(`Application running at port ${PORT}`);
  });
}
bootstrap();
