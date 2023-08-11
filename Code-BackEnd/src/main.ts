import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .addBasicAuth()
    .setTitle('Connect Pharmacy Routes')
    .setDescription('The Connect Pharmacy description')
    .setVersion('1.0')
    .addTag('Connect Pharmacy')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
