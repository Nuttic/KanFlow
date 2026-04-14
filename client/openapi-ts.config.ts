import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:3000/api-json', // Ссылка на твой Swagger JSON
  output: 'src/client',
  plugins: [
    '@hey-api/typescript', // Генерирует интерфейсы (типы)
    {
      name: '@hey-api/client-axios', // Или '@hey-api/client-fetch'
      // Здесь можно добавить настройки для axios, если нужно
    },
    '@hey-api/sdk', // Генерирует сами функции вызова (Services)
  ],
});