import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'; // Не забудь установить и импортировать!

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Настройка CORS для работы с фронтендом
  app.enableCors({
    // Адрес твоего фронта (из Vite/React)
    origin: 'http://localhost:5173', 
    
    // Обязательно true, чтобы браузер позволял передавать и получать куки
    credentials: true,
    
    // Методы, которые разрешены
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // ВАЖНО: Для работы с куками в NestJS нужно подключить cookie-parser
  // Установи его: npm install cookie-parser
  app.use(cookieParser());

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Сервер запущен на http://localhost:${port}/api`);
}

bootstrap();