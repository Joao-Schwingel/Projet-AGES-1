import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Optional,
  ValidationPipeOptions,
  HttpStatus,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export interface ParseDateOptions
  extends Omit<
    ValidationPipeOptions,
    'transform' | 'validateCustomDecorators' | 'exceptionFactory'
  > {
  optional?: boolean;
  exceptionFactory?: (error: any) => any;
}

const VALIDATION_ERROR_MESSAGE = 'Validation failed (parsable date expected)';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  protected exceptionFactory: (error: string) => any;

  constructor(@Optional() private readonly options: ParseDateOptions = {}) {
    const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
      options;
    this.exceptionFactory =
      exceptionFactory ||
      ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value && this.options.optional) return;
    if (typeof value !== 'string' || !value.match(/\d{1,4}\-\d{1,2}\-\d{1,2}/))
      throw this.exceptionFactory(VALIDATION_ERROR_MESSAGE);
    return value;
  }
}
