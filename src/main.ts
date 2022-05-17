import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      /^(https?:\/\/([^\.]*\.)?6283c6f24a6f022e6d37a3a3--storied-puppy-f7ef20.netlify\.app)$/i,
      /^(https?:\/\/([^\.]*\.)?localhost:3000\.com)$/i,
    ],
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(parseInt(process.env.PORT) || 5000);
}
bootstrap();
