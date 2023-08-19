import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { createAutoAuthorizePlugin } from './plugins/auto-authorize.plugin';

export function configureSwagger(app: INestApplication) {
  const options: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      plugins: [createAutoAuthorizePlugin()],
    },
  };

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Connect Pharmacy Routes')
    .setDescription('API Documentation of Connect Pharmacy')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, options);
}
