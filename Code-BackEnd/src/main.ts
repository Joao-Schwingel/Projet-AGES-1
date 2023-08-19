import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { AllExceptionsFilter } from './errors/all-exceptions.filter';
import { configureSwagger } from './swagger/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          upgradeInsecureRequests: null,
        },
      },
    }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));
  configureSwagger(app);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
