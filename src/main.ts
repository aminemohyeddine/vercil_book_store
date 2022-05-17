import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  var whitelist = [
    'https://sweet-eclair-6fba13.netlify.app',
    'http://localhost:3000',
  ];

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  app.use(cookieParser());
  await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
