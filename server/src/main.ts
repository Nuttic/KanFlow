import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'; // Не забудь установить и импортировать!
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('KanFlow API')
    .setDescription('The KanFlow project API description')
    .setVersion('1.0')
    .addBearerAuth() // Если используешь JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Это создаст маршрут http://localhost:3000/api
  SwaggerModule.setup('api', app, document);

  // Настройка CORS для работы с фронтендом
  app.enableCors({
    // Адрес твоего фронта (из Vite/React)
    origin: 'http://localhost:5173', 
    
    // Обязательно true, чтобы браузер позволял передавать и получать куки
    credentials: true,
    
    // Методы, которые разрешены
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // ВАЖНО: Для работы с куками в NestJS нужно подключить cookie-parser
  // Установи его: npm install cookie-parser
  app.use(cookieParser());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Сервер запущен на http://localhost:${port}/api`);
}

bootstrap();