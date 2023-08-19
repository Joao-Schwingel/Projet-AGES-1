import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;

    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const messageObject = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    const jsonObj = JSON.parse(JSON.stringify(messageObject));

    const messageType = isHttpException
      ? exception.name
      : 'Internal server error';

    if (!isHttpException) {
      this.logger.error(exception);
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      type: messageType,
      message: jsonObj.message,
      errorMessage: jsonObj.error,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
